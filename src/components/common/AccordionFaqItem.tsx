import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIcon } from './AppIcon';

export interface AccordionFaqItemProps {
  question: string;
  answer: string;
  initialExpanded?: boolean;
}

export const AccordionFaqItem: React.FC<AccordionFaqItemProps> = ({
  question,
  answer,
  initialExpanded = false,
}) => {
  const { colors, spacing } = useTheme();
  const [expanded, setExpanded] = useState(initialExpanded);

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <TouchableOpacity
        onPress={() => setExpanded(prev => !prev)}
        activeOpacity={0.7}
        style={[styles.headerRow, { paddingVertical: spacing.lg }]}
      >
        <AppText
          variant="bodyLarge"
          color="textPrimary"
          style={styles.questionText}
        >
          {question}
        </AppText>
        <View style={styles.iconBox}>
          <AppIcon
            name={expanded ? 'chevron-up' : 'chevron-right'}
            size={20}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={[styles.answerBox, { paddingBottom: spacing.lg }]}>
          <AppText
            variant="body"
            color="textSecondary"
            style={styles.answerText}
          >
            {answer}
          </AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    flex: 1,
    paddingRight: 12,
    fontWeight: '500',
    lineHeight: 22,
  },
  iconBox: {
    paddingLeft: 4,
  },
  answerBox: {
    paddingTop: 2,
  },
  answerText: {
    lineHeight: 22,
  },
});

export default AccordionFaqItem;
