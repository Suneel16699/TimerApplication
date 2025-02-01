import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TimerContext from './TimerContext';

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);

  const renderHistoryItem = ({ item }) => {

    console.log(item,":item");
    return(
    <View style={styles.historyItem}>
      <Text>{item.name}</Text>
      <Text>{item.duration} Secs</Text>
      <Text>{item.status}</Text>
    </View>
    )
  }
  ;

  return (
    <View style={styles.container}>
      <View style={styles.historyHeader}>
        <Text>Name</Text>
        <Text>Duration of Timer</Text>
        <Text>Status   </Text>
      </View>
      <FlatList
        data={[...state.timers, ...state.completedTimers]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHistoryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    marginVertical:2,
    borderWidth: 1,
  },
  historyHeader: {
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:10,
    backgroundColor:"#ccddee",
    borderWidth: 1,
  },
});

export default HistoryScreen;
