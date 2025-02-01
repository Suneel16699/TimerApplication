import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, Button, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import TimerContext from './TimerContext';

const HomeScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(TimerContext);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTimer, setActiveTimer] = useState(null);
  const [isPause,setIsPause] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (activeTimer && activeTimer.remaining > 0 && activeTimer.status === 'Running') {
      intervalRef.current = setInterval(() => {
        setActiveTimer((prevTimer) => {
          const newRemaining = prevTimer.remaining - 1;
          const updatedTimer = { ...prevTimer, remaining: newRemaining };
          dispatch({ type: 'UPDATE_TIMER', payload: updatedTimer });
          if (newRemaining <= 0) {
            clearInterval(intervalRef.current);
            setActiveTimer({ ...updatedTimer, status: 'Completed' });
            dispatch({ type: 'COMPLETE_TIMER', payload: {...updatedTimer,status: 'Completed'} });
            setActiveTimer(null);
          }
          return updatedTimer;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [activeTimer, dispatch]);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const startTimer = (timer) => {
    setActiveTimer({ ...timer, status: 'Running' });
  };

  const pauseTimer = () => {
    setIsPause(!isPause);
    clearInterval(intervalRef.current);
    setActiveTimer((prevTimer) => ({ ...prevTimer, status: 'Paused' }));
    dispatch({ type: 'UPDATE_TIMER', payload: {...activeTimer, status: 'Paused' } });
  };

  const ResumeTimer = ()=>{
    setIsPause(!isPause);
    startTimer(activeTimer);
  }

  const resetTimer = (timer) => {
    clearInterval(intervalRef.current);
    dispatch({ type: 'UPDATE_TIMER', payload: { ...timer, remaining: timer.duration, status: 'Not Started' } });
    setActiveTimer(null);
  };

  const renderTimer = ({ item }) => {
    const isActive = activeTimer && activeTimer.id === item.id;
    return (
      <View style={styles.timer}>
        <Text>{item.name}</Text>
        <Text>{item.remaining}s</Text>
        {!isActive ? (
          <Button title="Start" onPress={() => startTimer(item)} />
        ): null}
      </View>
    );
  };

  const groupedTimers = state.timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const sections = Object.keys(groupedTimers).map(key => ({
    title: key,
    data: expandedSections[key] ? groupedTimers[key] : []
  }));

  return (
    <View style={styles.container}>
      <Button title="Add Timer" onPress={() => navigation.navigate('AddTimer')} />
      <Button title="Timer History" onPress={() => navigation.navigate('History')} />
      {activeTimer?.remaining && (
        <View style={styles.activeTimer}>
          <Text style={styles.activeTimerText}>Active Timer: {activeTimer.name} - {activeTimer.remaining}s</Text>
          <Button title= {isPause? "Pause" : "Resume"} onPress={isPause ? pauseTimer : ResumeTimer} />
          <Button title="Reset" onPress={() => resetTimer(activeTimer)} />
        </View>
      )}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTimer}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity onPress={() => toggleSection(title)}>
            <Text style={styles.header}>{title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f9c2ff',
    padding: 10,
    textAlign:'center'
  },
  timer: {
    padding: 10,
  },
  activeTimer: {
    padding: 20,
    backgroundColor: '#d1e7dd',
    marginVertical: 10,
    borderRadius: 10,
  },
  activeTimerText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;
