import { StyleSheet, Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

export const colors = {
  semiTransparent: 'rgba(0, 0, 0, 0.4)',
  transparent: '#0000',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  bittersweet: 'rgb(255, 101, 94)',
  parisDaisy: 'rgb(247, 234, 72)',
  sunshade: 'rgb(252, 145, 86)',
  bittersweet2: 'rgb(255, 94, 94)'
}

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,    
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  container: {
      flex: 1,
      backgroundColor: colors.background1
  },
  gradient: {
      ...StyleSheet.absoluteFillObject
  },
  scrollview: {
      flex: 1
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  paginationInactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
  }
})
