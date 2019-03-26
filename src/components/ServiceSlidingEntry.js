import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableHighlight, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/index.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const sliderHeight = slideHeight + 20;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: 5,
  },
  slideInnerContainer: {
    width: '100%',
    height: '100%',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10
  },
  top: {
    flex: 1,
    flexDirection: 'row',
  },
  linearGradient: {
    height: 20, 
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center'    
  },
  cost: {
    color: colors.white,
    fontSize: 15
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 25,    
  },
  summary: {
    color: colors.black,
    fontSize: 15
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,    
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.bittersweet,
    color: colors.white,
    fontSize: 15,
    textAlign: 'center',
    overflow: 'hidden'
  },
  moreInfo: {
    textDecorationLine: 'underline',
    fontSize: 15,
    color: colors.bittersweet,
    marginLeft: 10
  }
});

class ServiceSlidingEntry extends React.Component {

  constructor (props) {
    super(props);

  }

  render () {
    const { name, starting_at, description} = this.props.data;    
    return (
      <TouchableHighlight style={styles.container}>
        <View style={styles.slideInnerContainer}>
          <View style={styles.top}>
            <Text style={styles.summary}>Starting at </Text>
            <LinearGradient
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[colors.parisDaisy, colors.sunshade, colors.bittersweet2]} >
              <Text style={styles.cost}>
                {starting_at.stringValue}
              </Text>
            </LinearGradient>
          </View>        
          <Text style={styles.title} >{ name.stringValue }</Text>
          <Text style={styles.summary} 
            numberOfLines={6}
          >
            { description.stringValue }
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.infoIcon}>!</Text>
            <Text style={styles.moreInfo}>More Info</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

// ServiceSlidingEntry.defaultProps = {
//   cost: 0,
//   name: 'unknown',
//   summary: 'Here is summary of service'
// }

// ServiceSlidingEntry.propTypes = {
//   cost: PropTypes.number,
//   name: PropTypes.string,
//   summary: PropTypes.string
// }

export default ServiceSlidingEntry;
