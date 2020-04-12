import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Skeleton, Row, Col, Typography } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import {
  selectHomeContainer,
  selectTracksData,
  selectTracksError,
  selectArtistName
} from './selectors';
import { artistContainerCreators } from './reducer';
import saga from './saga';
import { TrackContainer, SearchArea, SongDescription } from './TrackImage';

const { Title } = Typography;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: auto;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;

export function ArtistContainer({
  dipatchArtistName,
  intl,
  tracksData = {},
  tracksError = null,
  artistName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(true);
  const [defaultScreen, setDefaultScreen] = useState(true);
  const [modal, setModal] = useState({ show: false });

  useEffect(() => {
    const loaded = _.get(tracksData, 'results', null) || tracksError;
    if (loading && loaded) {
      setLoading(false);
      setDefaultScreen(false);
    }
  });

  const handleOnChange = aName => {
    if (aName) {
      dipatchArtistName(aName);
      setLoading(true);
      setDefaultScreen(false);
      return;
    }
    setDefaultScreen(true);
  };
  const debouncedHandleOnChange = _.debounce(handleOnChange, 800);

  const renderDefault = () => {
    return (
      <Row justify="center" style={{ margin: '30px' }}>
        <Col xs={24}>
          <Title level={4} style={{ textAlign: 'center' }} strong>
            Enter a search term
          </Title>
        </Col>
      </Row>
    );
  };

  const renderError = () => {
    const count = _.get(tracksData, 'resultCount', 0);
    if (!count) {
      return (
        <Row justify="center" style={{ margin: '30px' }}>
          <Col xs={24}>
            <Title level={4} style={{ textAlign: 'center' }} strong>
              No Result found for the search query.
            </Title>
          </Col>
        </Row>
      );
    }
  };

  const renderTrackList = () => {
    const tracks = _.get(tracksData, 'results', []);
    return (
      (tracks.length !== 0 || loading) && (
        <Row justify="center" style={{ margin: '10px 0' }}>
          <Skeleton loading={loading} active></Skeleton>
          {tracks.map(track => {
            return (
              <Col
                key={track.trackId}
                xs={{ span: 8 }}
                lg={{ span: 4 }}
                style={{ padding: '5px' }}
              >
                <Skeleton loading={loading} avatar active>
                  <TrackContainer track={track} setDescription={setModal} />
                </Skeleton>
              </Col>
            );
          })}
        </Row>
      )
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Row justify="center">
        <Col span={24}>
          <SearchArea
            onSearch={debouncedHandleOnChange}
            searchTerm={artistName}
          />
        </Col>
      </Row>
      {defaultScreen ? renderDefault() : renderTrackList()}
      {!defaultScreen && !loading ? renderError() : ''}
      <SongDescription
        visible={modal.show}
        setDescription={setModal}
        track={modal.track}
      />
    </Container>
  );
}

ArtistContainer.propTypes = {
  dipatchArtistName: PropTypes.func,
  intl: PropTypes.object,
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  tracksError: PropTypes.object,
  artistName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  artistContainer: selectHomeContainer(),
  tracksData: selectTracksData(),
  tracksError: selectTracksError(),
  artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetArtists } = artistContainerCreators;
  return {
    dipatchArtistName: artistName => dispatch(requestGetArtists(artistName))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo,
  withRouter
)(ArtistContainer);

export const ArtistContainerTest = compose(injectIntl)(ArtistContainer);
