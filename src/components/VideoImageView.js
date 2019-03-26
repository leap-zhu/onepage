import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Animated } from 'react-native';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',    
  },
  video: {
    width: '100%',
    height: '100%'
  },
  image: {
    position: 'absolute',
    alignSelf: 'stretch',
    width: '100%',
    height: '100%',
  }
});

class VideoImageView extends React.Component {
  constructor (props) {
    super(props);

    if (props.needAnimation) {
      this.state = {
        viewOpacity: new Animated.Value(0)
      };
    } else {
      this.state = {
        viewOpacity: new Animated.Value(1)
      };
    }      
  }

  componentDidMount () {
      const {viewOpacity } = this.state;
      Animated.timing(
        viewOpacity,
        {
          toValue: 1,
          duration: 500,
        }
      ).start();
  }

  componentWillReceiveProps (props) {
    if (props.needAnimation) {      
      const {viewOpacity } = this.state;
      Animated.timing(
        viewOpacity,
        {
          toValue: 1,
          duration: 500,
        }
      ).start();
    }else{
      const {viewOpacity } = this.state;
      Animated.timing(
        viewOpacity,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }
  }

  render() {
    const { style } = this.props;
    const { viewOpacity } = this.state;
    if (this.props.isVideo) {
      if (!this.props.needAnimation) {
        return(
          null
        );
      } else {
        return(
          <Animated.View style={[styles.container, style, {opacity: viewOpacity}]}>
            <Video style={[styles.video]}
              ref={(ref) => {this.player = ref}}
              source={this.props.source}
              repeat={true}
              resizeMode={'stretch'}
              paused={!this.props.needAnimation}
            />
          </Animated.View>
        );
      }
    } else {
      return(
        <Animated.View style={[styles.container, style, {opacity: viewOpacity}]}>
          <Image style={styles.image}
            source={this.props.source}
            resizeMode={'stretch'}
          />
        </Animated.View>
      );
    }
  }
}

VideoImageView.defaultProps = {
  isVideo: false,
  needAnimation: false,
  source: require('../../assets/images/massageimage-bg.png')
}

VideoImageView.propTypes = {
  isVideo: PropTypes.bool,
  needAnimation: PropTypes.bool,
  source: PropTypes.oneOfType([
    { uri: PropTypes.string },
    PropTypes.number
  ])
}

export default VideoImageView;
