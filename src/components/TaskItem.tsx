import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxDone]}
        onPress={() => onToggle(task.id)}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <Text style={[styles.title, task.completed && styles.titleDone]}>
        {task.title}
      </Text>

      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4f6ef7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#4f6ef7',
    borderColor: '#4f6ef7',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    color: '#ccc',
    fontSize: 14,
  },
});
