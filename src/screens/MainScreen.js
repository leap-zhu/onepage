import React from 'react';
import { StyleSheet, SafeAreaView, Image, TouchableOpacity, View, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import ServiceSlidingEntry, { sliderWidth, itemWidth } from '../components/ServiceSlidingEntry';
import gStyles, { colors, IS_IOS } from '../styles/index.style';
import MyBackground from '../components/MyBackground';
import RestApi from '../network/RestApi.js';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
    position: (IS_IOS ? 'absolute' : 'relative'),
    paddingLeft: (IS_IOS ? 20 : 0),
    paddingRight: 0
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  location: {
    color: colors.white
  },
  changeLocation: {
    color: colors.bittersweet
  },
  bottomWrapper: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
  },
  welcomebox: {
    flex: 1,    
    flexDirection: 'column',
    width: '100%',
    left: 20,
    marginBottom: 20
  },
  welcomemsg: {
    color: colors.white,
    fontSize: 30
  },
  welcomesubmsg: {
    color: colors.white,
    fontSize: 12
  },
  bookButton: {
    height: 56,   
    borderRadius: 28,
    bottom: 25,
    marginLeft: 20,
    marginRight: 20
  },
  linearGradient: {
    flex: 1,
    flexDirection: 'column',
    height: 56, 
    borderRadius: 28,
    alignItems: 'center'    
  },
  bookTitle: {
    margin: 14,
    color: colors.white,
    fontSize: 18
  },
  stateWrapper: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    width: '100%', 
    height: '100%'},
  stateText: {
    color: colors.white,
    fontSize: 15,
    padding: 10
  }
});

class MainScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      serviceIndex: 0,
      isVideoBackground:false,
      backgroundSource: require('../../assets/images/ivtherapyimage-bg.png'),
      serviceName: "",
      greatingMsg: "Hi!",
      loadingData: true,
      isError: false,
      dataSource: [],
      buttonText: ''
    };
    this.onSnapToItem = this.onSnapToItem.bind(this);
  }

  componentDidMount () {
    this.getData();    
  }

  getData() {
    RestApi.getGreatingMessage((msg, error) => {
      if (error === null) {
        this.setState({
          greatingMsg: 'Hi ' + msg.name_first.stringValue
        })
      }
      RestApi.getServiceInformations((services, error) => {
        if (error !== null) {
          this.setState({
            loadingData: false,
            isError: true
          })
        } else {
          this.setState({
            dataSource: services,
            loadingData: false,
            isError: false
          })
          this.onSnapToItem(0)
        }        
      });
    });    
  }

  render() {

    const { isVideoBackground, backgroundSource, serviceName } = this.state;

    if (this.state.loadingData) {
      return (
        <SafeAreaView style={gStyles.safeArea}>      
          <MyBackground
            isVideo={isVideoBackground}
            source={backgroundSource}
            name={serviceName}
          />
          {this.renderTopbar()}
          {this.renderLoading()}
        </SafeAreaView>
      );
    } else {
      if (this.state.isError) {
        return (
          <SafeAreaView style={gStyles.safeArea}>      
            <MyBackground
              isVideo={isVideoBackground}
              source={backgroundSource}
              name={serviceName}
            />
            {this.renderTopbar()}
            {this.renderError()}
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={gStyles.safeArea}>      
            <MyBackground
              isVideo={isVideoBackground}
              source={backgroundSource}
              name={serviceName}
            />
            {this.renderTopbar()}
            {this.renderContent()}
          </SafeAreaView>
        );
      }      
    }
  }

  onSnapToItem = (index) => {    
    var item = this.state.dataSource[index];
    var videoAsset = this.getAssets(item.background_video);
    if (videoAsset !== null) {
      this.setState({
        serviceIndex: index,
        isVideoBackground:true,
        backgroundSource:videoAsset,
        serviceName: item.name.stringValue,
        buttonText: item.button_text.stringValue
      });
    } else {
      var imageAsset = this.getAssets(item.background_image);
      if (imageAsset === null) {
        imageAsset = require('../../assets/images/ivtherapyimage-bg.png')
      }
      this.setState({
        serviceIndex: index,
        isVideoBackground:false,
        backgroundSource:imageAsset,
        serviceName: item.name.stringValue,
        buttonText: item.button_text.stringValue
      });
    }
  }

  getAssets (text) {
    if (typeof text !== 'object' || typeof text.stringValue !== 'string') {
      return null;
    }
    var asset = null;
    switch(text.stringValue) {
      case 'stretchviodeo-bg.mp4':
        asset = require('../../assets/videos/stretchviodeo-bg.mp4');
      break;
      case 'ivtherapyvideo-bg.mp4':
        asset = require('../../assets/videos/ivtherapyvideo-bg.mp4');
      break;
      case 'massageimage-bg.jpg':
        asset = require('../../assets/images/massageimage-bg.png');
      break;
      case 'ivtherapyimage-bg.jpg':
        asset = require('../../assets/images/ivtherapyimage-bg.png');
      break;
      case 'couplesmassageimage-bg.jpg':
        asset = require('../../assets/images/couplesmassageimage-bg.png');
      break;
      case 'stretchimage-bg.jpg':
        asset = require('../../assets/images/stretchimage-bg.png');
      break;
    }
    return asset;
  }

  renderTopbar () {
    return(
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} >
          <Image source={require('../../assets/icons/black.png')} />
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={styles.location}>
            1150 Santa Monica Blvd.
          </Text>
          <Text style={styles.changeLocation}>
            Change Location
          </Text>
        </View>

        <TouchableOpacity style={styles.button} >              
          <Image source={require('../../assets/icons/calendar.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  renderLoading() {
    return(
      <View style={styles.stateWrapper}>
        <Text style={styles.stateText} >
          Loading...
        </Text>
      </View>
    );
  }

  renderError() {
    return(
      <View style={styles.stateWrapper}>
        <Text style={styles.stateText}>
          Network Error!
        </Text>
        <TouchableOpacity>
          <Text style={styles.stateText}>
            Retry!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderContent() {
    const { serviceIndex, serviceName, greatingMsg, dataSource, buttonText } = this.state;
    return(
      <View style={styles.bottomWrapper}>
        <View style={styles.welcomebox}>
          <Text style={styles.welcomemsg}>
            {greatingMsg}
          </Text>
          <Text style={styles.welcomesubmsg}>
            SELECT A SERVICE
          </Text>
        </View>

        <Carousel
          ref={c => this._slider1Ref = c}
          data={dataSource}
          renderItem={this.renderServiceEntry}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={serviceIndex}
          inactiveSlideScale={1.0}
          inactiveSlideOpacity={0.7}
          loop={true}
          loopClonesPerSide={2}
          onSnapToItem={(index) => this.onSnapToItem(index)}
        />
        {this.renderPagination()}
        <TouchableOpacity style={styles.bookButton} >
          <LinearGradient
            style={styles.linearGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.parisDaisy, colors.sunshade, colors.bittersweet2]}
          >
            <Text style={styles.bookTitle}>
              {buttonText}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  renderServiceEntry ({item, index}, parallaxProps) {
    return (
      <ServiceSlidingEntry
        data={item}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  renderPagination () {
    const { serviceIndex, dataSource } = this.state;
    return(  
      <View style={{width: '100%', flex: 1, flexDirection: 'row', justifyContent:'flex-start', marginBottom: 10}} >
        <Pagination      
          dotsLength={dataSource.length}
          activeDotIndex={serviceIndex}
          dotColor={colors.white}
          inactiveDotColor={'#0000'}
          dotStyle={gStyles.paginationDot}
          inactiveDotStyle={gStyles.paginationInactiveDot}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
          inactiveDotScale={1.0}
          inactiveDotOpacity={1.0}
        />
      </View>
    )
  }
}

MainScreen.navigationOptions = {
  header: null,
}

export default MainScreen;
