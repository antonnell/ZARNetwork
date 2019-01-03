/*eslint-disable */
import React, { Component } from 'react';
import { View, StatusBar, Dimensions, Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import Card from './card';
import RecentCard from './recentCard';
import TitleText from '../../common/TitleText';
// import AllBeneficiary from '../../images/AllBeneficiary.png';
import PayNewBeneficiary from '../../images/PayNewBeneficiary.png';
import TitleHeader from '../../common/TitleHeader';
import { getBeneficiaryDetail } from '../../controllers/api/beneficiary';
import Loader from '../../common/Loader';
import { getFirstCharOfString } from '../../utility/index';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Pay extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let isBackArrowPresent = false;
    if (navigation && navigation.state && navigation.state.params) {
      isBackArrowPresent = navigation.state.params.isBackArrow;
    }
    this.state = {
      isBackArrowPresent,
      isLoading: false,
    };
    this.handleNewBeneficiary = this.handleNewBeneficiary.bind(this);
    this.handleAccountPay = this.handleAccountPay.bind(this);
  }

  componentDidMount() {
    if (getBeneficiaryDetail) {
      this.setState({
        isLoading: true,
      });
      getBeneficiaryDetail()
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          });
          Alert.alert('Error', error);
        });
    }
  }

  /**
   * @method handleNewBeneficiary :To render pay screen.
   */
  handleNewBeneficiary() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('BeneficiaryDetails', { isBackArrow });
    }
  }

  /**
   * @method handleAccountPay : To open account payment screen
   */
  handleAccountPay() {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('PayBeneficiary', { isBackArrow });
    }
  }

  /**
   * @method renderLoader : To display loader indicator.
   */
  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Loader
          isLoading={isLoading}
          loaderStyle={0.25}
          containerStyle={{
            height: deviceHeight * 0.5,
            width: deviceWidth,
          }}
        />
      );
    }
    return null;
  }

  renderNoBeneficiaryMessage() {
    const { beneficiaries } = this.props;
    const { isLoading } = this.state;
    if (isLoading === true) {
      return null;
    }

    const beneficiariesLength = beneficiaries.length;
    if (beneficiariesLength === 0) {
      return (
        <View
          style={{
            backgroundColor: 'rgb(0,169,248)',
            height: 40,
            justifyContent: 'center',
            marginLeft: 20,
            marginRight: 20,
            paddingLeft: 10,
            borderStyle: 'solid',
            borderRadius: 4,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
            No beneficiary details.
          </Text>
        </View>
      );
    }

    return null;
  }

  renderBeneficiaryList() {
    // const arr = [
    //   {
    //     header: 'JW',
    //     title: 'Joseph S. Wiggins',
    //     subTitle: 'CAPITEC | 13425386475',
    //   },
    //   {
    //     header: 'JM',
    //     title: 'Jacob E. Miller',
    //     subTitle: 'ABSA BANK | 13425386475',
    //   },
    //   {
    //     header: 'JL',
    //     title: 'James J. Lomeli',
    //     subTitle: 'ABSA BANK | 13425386475',
    //   },
    //   {
    //     header: 'JW',
    //     title: 'Joseph S. Wiggins',
    //     subTitle: 'CAPITEC | 13425386475',
    //   },
    //   {
    //     header: 'JM',
    //     title: 'Jacob E. Miller',
    return null;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    const { isBackArrowPresent } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
          rightIconName="search"
          isBackArrow={isBackArrowPresent}
          onRightBtnPress={() => {
            // console.log('search');
          }}
        />
        <View style={styles.cardStyle}>
          <Card
            navigation={navigation}
            text="Pay New Beneficiary"
            icon={PayNewBeneficiary}
            onPress={this.handleNewBeneficiary}
          />
          {/* For the time being this view is commented as per client requirements */}
          {/* <View style={styles.seperaterStyle} />
          <Card navigation={navigation} text="View all Beneficiary" icon={AllBeneficiary} /> */}
        </View>
        <TitleText
          titleText="All Beneficiary"
          mainStyle={styles.mainStyle}
          textStyle={styles.recentTextStyle}
        />
        <View
          style={{
            marginTop: deviceHeight * 0.02,
          }}
        >
          {this.renderNoBeneficiaryMessage()}
          <ScrollView
            style={{
              height: deviceHeight * 0.5,
              width: deviceWidth,
            }}
            showsVerticalScrollIndicator={false}
          >
            {this.renderBeneficiaryList()}
            <View style={{ height: deviceHeight * 0.1 }} />
          </ScrollView>
          {this.renderLoader()}
        </View>
      </View>
    );
  }
}
Pay.defaultProps = {
  navigation: {},
  beneficiaries: [],
};

Pay.propTypes = {
  navigation: PropTypes.shape({}),
  beneficiaries: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  beneficiaries: state.userBeneficiaryReducer.beneficiaries,
});
export default connect(mapStateToProps)(Pay);
