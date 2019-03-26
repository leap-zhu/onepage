import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import VideoImageView from './VideoImageView';

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',    
  }
});

class MyBackground extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isFirstView: true,
      isOldVideo: false,
      oldSource: require('../../assets/images/massageimage-bg.png'),
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      isFirstView: !this.state.isFirstView,
      isOldVideo: this.props.isVideo,
      oldSource: this.props.source
    })
  }

  render() {
    const {isVideo, source} = this.props;
    const {isFirstView,isOldVideo, oldSource} = this.state;
    return (
      <View style={styles.container}>
        <VideoImageView style={{zIndex:isFirstView ? 0 : -1}}
          isVideo={isFirstView ? isVideo : isOldVideo}
          source={isFirstView ? source : oldSource}
          needAnimation={isFirstView}
        />
        <VideoImageView style={{zIndex:isFirstView ? -1 : 0}}
          isVideo={isFirstView ? isOldVideo : isVideo}
          source={isFirstView ? oldSource : source}
          needAnimation={!isFirstView}
        />
      </View>
    );
  }
}

MyBackground.propTypes  = {
  isVideo: PropTypes.bool,
  source: PropTypes.oneOfType([
    { uri: PropTypes.string },
    PropTypes.number
  ]),
  name: PropTypes.string
}

export default MyBackground
