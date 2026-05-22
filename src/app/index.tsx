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
import { Priority, Task } from '@/constants/types';

const PRIORITY_OPTIONS: { label: string; value: Priority; color: string }[] = [
  { label: 'Високий', value: 'high', color: '#ef4444' },
  { label: 'Середній', value: 'medium', color: '#f59e0b' },
  { label: 'Низький', value: 'low', color: '#22c55e' },
];

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Купити продукти', completed: false, priority: 'medium' },
  { id: '2', title: 'Зробити домашнє завдання', completed: true, priority: 'high' },
  { id: '3', title: 'Прогулятись', completed: false, priority: 'low' },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [inputText, setInputText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');

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
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мої завдання</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Нове завдання..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.priorityRow}>
        {PRIORITY_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.priorityButton,
              selectedPriority === option.value && {
                backgroundColor: option.color,
                borderColor: option.color,
              },
            ]}
            onPress={() => setSelectedPriority(option.value)}
          >
            <View
              style={[
                styles.priorityDot,
                { backgroundColor: selectedPriority === option.value ? '#fff' : option.color },
              ]}
            />
            <Text
              style={[
                styles.priorityLabel,
                selectedPriority === option.value && { color: '#fff' },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => {}}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Завдань немає. Додай перше!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  inputRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#4f6ef7',
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
  },
  priorityRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 40,
  },
});
