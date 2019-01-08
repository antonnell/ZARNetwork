import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import RecentCard from '../recentCard';
import TitleHeader from '../../../common/TitleHeader';
import { getFirstCharOfString } from '../../../utility/index';

class ViewBeneficiaryList extends Component {
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
    this.handleAccountPay = this.handleAccountPay.bind(this);
  }

  /**
   * @method handleAccountPay : To open account payment screen
   */
  handleAccountPay(beneficiary) {
    const isBackArrow = true;
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('PayBeneficiary', { isBackArrow, selectedBeneficiary: beneficiary });
    }
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
        <View style={styles.emptyDetilViewStyle}>
          <Text style={styles.emptyDetilTextStyle}>No beneficiaries found.</Text>
        </View>
      );
    }

    return null;
  }

  renderBeneficiaryList() {
    const { beneficiaries } = this.props;
    const beneficiaryList = [];
    const beneficiariesLength = beneficiaries.length;
    if (beneficiariesLength > 0) {
      for (let i = 0; i < beneficiariesLength; i += 1) {
        const header = getFirstCharOfString(beneficiaries[i].name);
        const bankDetail = beneficiaries[i].bank_uuid ? beneficiaries[i].bank_uuid : '--';
        beneficiaryList.push(
          <RecentCard
            key={Math.random()}
            header={header}
            title={beneficiaries[i].name}
            subtitle={bankDetail}
            beneficiary={beneficiaries[i]}
            onPress={this.handleAccountPay}
          />
        );
      }
      return beneficiaryList;
    }
    return null;
  }

  render() {
    const { navigation } = this.props;
    const { isBackArrowPresent } = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar backgroundColor="black" />
        <TitleHeader
          iconName="keyboard-arrow-left"
          onBtnPress={() => navigation.goBack()}
          title="ALL BENEFICIARIES"
          rightIconName="search"
          isBackArrow={isBackArrowPresent}
          onRightBtnPress={() => {
            // console.log('search');
          }}
        />
        <View style={styles.detailViewStyle}>
          {this.renderNoBeneficiaryMessage()}
          <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
            {this.renderBeneficiaryList()}
            <View style={styles.bottomViewStyle} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
ViewBeneficiaryList.defaultProps = {
  navigation: null,
  beneficiaries: [],
};

ViewBeneficiaryList.propTypes = {
  navigation: PropTypes.shape({}),
  beneficiaries: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = state => ({
  beneficiaries: state.userBeneficiaryReducer.beneficiaries,
});
export default connect(mapStateToProps)(ViewBeneficiaryList);
