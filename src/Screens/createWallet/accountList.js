import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * AccountListCard: A generic component for displaying a list of accounts.
 */
class AccountListCard extends Component {
  constructor(props) {
    super(props);
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  toggleHandler(item) {
    const { handleAccountTypeList } = this.props;
    handleAccountTypeList(item);
  }

  render() {
    const { data, selectedType } = this.props;
    const backgroundColor = 'rgb(0, 169, 255)';

    return (
      <View style={styles.listContainerStyle}>
        <View style={styles.listStyle}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              let defaultStyle = {
                ...styles.listButtonStyle,
              };
              if (selectedType === item.symbol) {
                defaultStyle = {
                  ...styles.listButtonStyle,
                  backgroundColor,
                };
              }
              return (
                <View keys={item.symbol} style={styles.listItemStyle}>
                  <TouchableOpacity style={defaultStyle} onPress={() => this.toggleHandler(item)}>
                    <Text>{item.symbol}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

/**
 * Custom setting props to be passed for AccountListCard display changes:
 *
 * data: Contains list of Account Types for AccountListCard.
 * index: Contains number value for selected value from AccountListCard.
 * handleAccountTypeList: Callback function to handle account type selection opertion.
 *
 */
/*eslint-disable*/
AccountListCard.propTypes = {
  selectedType: PropTypes.string,
  data: PropTypes.array,
  index: PropTypes.number,
  handleAccountTypeList: PropTypes.func,
};

export default AccountListCard;
