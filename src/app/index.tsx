import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { TaskItem } from '@/components/TaskItem';
import { COLORS } from '@/constants/colors';
import { Priority, Task } from '@/constants/types';

type Filter = 'all' | 'active' | 'done';

const PRIORITY_OPTIONS: { value: Priority; color: string }[] = [
  { value: 'high', color: COLORS.priorityHigh },
  { value: 'medium', color: COLORS.priorityMedium },
  { value: 'low', color: COLORS.priorityLow },
];

const FILTER_OPTIONS: { label: string; value: Filter; icon: string }[] = [
  { label: 'All', value: 'all', icon: 'list-outline' },
  { label: 'Active', value: 'active', icon: 'ellipse-outline' },
  { label: 'Done', value: 'done', icon: 'checkmark-circle-outline' },
];

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Купити продукти', completed: false, priority: 'high' },
  { id: '2', title: 'Зробити домашнє завдання', completed: true, priority: 'medium' },
  { id: '3', title: 'Прогулятись', completed: false, priority: 'low' },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [inputText, setInputText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [inputFocused, setInputFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'active') return !task.completed;
    if (activeFilter === 'done') return task.completed;
    return true;
  });

  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmed,
      completed: false,
      priority: selectedPriority,
    };
    setTasks((prev) => [newTask, ...prev]);
    setInputText('');
    setInputFocused(false);
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topIcon}>
          <Ionicons name="checkbox-outline" size={28} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>My Tasks</Text>

        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercent}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[COLORS.progressStart, COLORS.progressEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]}
            />
          </View>
          <Text style={styles.progressSub}>
            {activeCount} active, {completedCount} completed
          </Text>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Add a new task..."
              placeholderTextColor={COLORS.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {inputFocused && (
            <View style={styles.priorityPopup}>
              {PRIORITY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSelectedPriority(option.value)}
                >
                  <View
                    style={[
                      styles.priorityDot,
                      { backgroundColor: option.color },
                      selectedPriority === option.value && styles.priorityDotSelected,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.filterRow}>
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <TouchableOpacity
                key={filter.value}
                style={[styles.filterBtn, isActive && styles.filterBtnActive]}
                onPress={() => setActiveFilter(filter.value)}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={16}
                  color={isActive ? '#fff' : COLORS.textSecondary}
                />
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks yet</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topIcon: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  progressTrack: {
    height: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 8,
  },
  progressSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 14,
    zIndex: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityPopup: {
    position: 'absolute',
    top: 58,
    left: 0,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  priorityDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    opacity: 0.5,
  },
  priorityDotSelected: {
    opacity: 1,
    transform: [{ scale: 1.3 }],
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    gap: 10,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: 40,
  },
});
