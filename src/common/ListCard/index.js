import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { WALLET_LIST, ACCOUNT_TYPE_LIST } from '../constants';
import styles from './style';

/**
 * ListCard: A generic component for displaying a list of Items.
 */
class ListCard extends Component {
  constructor(props) {
    super(props);
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  toggleHandler(item) {
    const { handleList } = this.props;
    handleList(item);
  }

  renderList(defaultStyle, text, item) {
    return (
      <View style={styles.listItemStyle}>
        <TouchableOpacity style={defaultStyle} onPress={() => this.toggleHandler(item)}>
          <Text>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderListCard() {
    const { data, selectedType, type } = this.props;
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
              if (selectedType === item.uuid) {
                defaultStyle = {
                  ...styles.listButtonStyle,
                  backgroundColor,
                };
              }
              let text = '';
              if (type === WALLET_LIST) {
                text = item.description;
              }
              if (type === ACCOUNT_TYPE_LIST) {
                text = item.symbol;
              }
              return this.renderList(defaultStyle, text, item);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }

  render() {
    return this.renderListCard();
  }
}

/**
 * Custom setting props to be passed for ListCard display changes:
 *
 * data: Contains list of items for ListCard.
 * index: Contains number value for selected value from ListCard.
 * handleList: Callback function to handle item selection opertion.
 * type : Contains type of data in list.
 */
/*eslint-disable*/
ListCard.propTypes = {
  selectedType: PropTypes.string,
  data: PropTypes.array,
  index: PropTypes.number,
  handleList: PropTypes.func,
  type: PropTypes.string,
};

export default ListCard;
