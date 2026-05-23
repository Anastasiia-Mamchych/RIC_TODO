import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { Task } from '@/constants/types';

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  high: COLORS.priorityHigh,
  medium: COLORS.priorityMedium,
  low: COLORS.priorityLow,
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onCyclePriority: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete, onCyclePriority }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onCyclePriority(task.id)} hitSlop={8}>
        <View style={[styles.priorityDot, { backgroundColor: PRIORITY_COLORS[task.priority] }]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={26}
          color={task.completed ? COLORS.primary : COLORS.primaryLight}
        />
      </TouchableOpacity>

      <Text style={[styles.title, task.completed && styles.titleDone]}>
        {task.title}
      </Text>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={18} color="#F0A0B0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 12,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '400',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  deleteButton: {
    padding: 2,
  },
});
