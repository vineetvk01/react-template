import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Tag, Input, Row, Col, Modal, Skeleton } from 'antd';
import styled from 'styled-components';
import apple from '@images/apple-logo.svg';

const { Text, Title } = Typography;

const makeitLarge = url => {
  if (url.includes('100x100')) {
    return url.replace('100x100', '400x400');
  }
  return url;
};

const cropText = string => {
  if (!string) return string;
  return string.length > 35 ? string.substr(0, 20) : string;
};

const playTime = milliSecond => {
  const min = Math.floor((milliSecond / 1000 / 60) << 0);
  let sec = Math.floor((milliSecond / 1000) % 60);
  sec = ('0' + sec).slice(-2);
  return `${min}:${sec}`;
};

const getDateString = iSODate => {
  const dateObj = new Date(iSODate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  return `${date}/${month}/${year}`;
};

const TrackTitle = styled(Text)`
  position: static;
`;

const TrackSubTitle = styled(Text)`
  position: static;
`;

const TrackCard = styled(Card)`
  padding: 0px;
  background: #000;
  height: 290px;
`;

const Kind = styled(Tag)`
  position: absolute;
  top: 175px;
  right: 0px;
  font-size: 18px;
`;

const Price = styled(Tag)`
  position: absolute;
  top: 5px;
  right: 0px;
  font-size: 18px;
`;

const Time = styled(Tag)`
  position: absolute;
  top: 175px;
  left: 5px;
  font-size: 18px;
`;

const TrackContainer = ({ track, setDescription }) => {
  return (
    <TrackCard
      cover={
        <img
          src={makeitLarge(track.artworkUrl100)}
          width="100%"
          height="200px"
          style={{ margin: 'auto' }}
        />
      }
      hoverable={true}
      bordered={true}
      loading={false}
      onClick={() => setDescription({ show: true, track })}
      bodyStyle={{ padding: '5px' }}
    >
      <TrackTitle strong>{cropText(track.trackCensoredName)}</TrackTitle>
      <br />
      <TrackSubTitle>{cropText(track.artistName)}</TrackSubTitle>
      <br />
      {track.kind && <Kind color="#666">{track.kind}</Kind>}
      {track.trackPrice && <Price color="#87d068">$ {track.trackPrice}</Price>}
      {track.trackTimeMillis && (
        <Time color="blue"> ▶ {playTime(track.trackTimeMillis)} </Time>
      )}
    </TrackCard>
  );
};

TrackContainer.propTypes = {
  setDescription: PropTypes.func,
  track: PropTypes.object
};

const { Search } = Input;

export const SearchArea = ({ onSearch, searchTerm }) => {
  return (
    <Card>
      <Row justify="space-around" align="middle">
        <Col
          offset={6}
          xs={{ span: 2 }}
          lg={{ span: 2 }}
          style={{ textAlign: 'center' }}
        >
          <img src={apple} width="40" />
          <Title level={4} style={{ width: 100, margin: 0 }}>
            Itunes
          </Title>
        </Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            defaultValue={searchTerm}
            size="large"
            loading={false}
            onSearch={value => onSearch(value)}
            onChange={evt => onSearch(evt.target.value)}
            style={{ marginTop: '10px' }}
          />
        </Col>
      </Row>
    </Card>
  );
};

SearchArea.propTypes = {
  onSearch: PropTypes.func,
  searchTerm: PropTypes.string
};

const Info = styled.div`
  padding: 20px 10px;
`;

const TrackPrice = styled(Tag)`
  margin: 5px 4px !important;
  margin-left: 0px !important;
`;

const SongDescription = ({ visible, setDescription, track = {} }) => {
  const trackInfo = track => {
    return (
      <>
        <Row>
          <Col xs={8}>
            <img
              src={track.artworkUrl100}
              width="100%"
              height="150px"
              style={{ padding: '0 10px' }}
            />
          </Col>
          <Col xs={16}>
            {track.collectionName && (
              <>
                <Text strong>
                  <a
                    href={track.trackViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.collectionName}
                  </a>
                </Text>
                <hr />
              </>
            )}
            <Text strong>{track.trackCensoredName}</Text>
            <br />
            <Text>Artists: {track.artistName}</Text>
            <br />
            {track.releaseDate && (
              <Text>Release Date: {getDateString(track.releaseDate)}</Text>
            )}
            <br /> <br />
            <Tag color="#666">Type: {track.kind}</Tag>
            <Tag color="#666">Genre: {track.primaryGenreName}</Tag>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Info>
              <TrackPrice color="magenta">
                Collection Price:
                {track.trackPrice
                  ? ` $${track.collectionPrice}`
                  : ' Not for sale'}
              </TrackPrice>
              <TrackPrice color="magenta">
                Track Price:
                {track.trackPrice ? ` $${track.trackPrice}` : ' Not for sale'}
              </TrackPrice>
              {track.trackRentalPrice != null && (
                <TrackPrice color="magenta">
                  Track-Rental Price: ${track.trackRentalPrice}
                </TrackPrice>
              )}
            </Info>
          </Col>
          <Col xs={24}>
            <Text strong>Description: </Text>
            <hr />
            <Text>
              {track.longDescription
                ? track.longDescription
                : 'No Description Available for this track'}
            </Text>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <Modal
      title={
        track.trackName ? `${track.trackName} - ${track.artistName}` : '...'
      }
      centered
      visible={visible}
      onOk={() => setDescription(false)}
      onCancel={() => setDescription(false)}
      footer={null}
      bodyStyle={{ minHeight: '500px' }}
    >
      <Skeleton loading={!track.trackName}>{trackInfo(track)}</Skeleton>
    </Modal>
  );
};

SongDescription.propTypes = {
  visible: PropTypes.boolean,
  setDescription: PropTypes.func,
  track: PropTypes.object
};

export { SongDescription, TrackContainer };
