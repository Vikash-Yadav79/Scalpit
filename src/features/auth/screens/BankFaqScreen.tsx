import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppHeader } from '../../../components/common/AppHeader';
import { AppText } from '../../../components/common/AppText';
import { AccordionFaqItem } from '../../../components/common/AccordionFaqItem';

export const BankFaqScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation();
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const faqs = [
    {
      question: "I can't find my bank. What should I do?",
      answer:
        'If your bank is not listed under popular banks, use the search bar to enter the exact bank name or IFSC code. If it still does not appear, ensure your bank supports automated IMPS/UPI penny drop mandates.',
    },
    {
      question: 'Can I verify my bank later?',
      answer:
        'No. SEBI regulations require a verified savings bank account in your name before any Demat or Trading account can be activated.',
    },
    {
      question: 'Why do I need to send ₹1 to Scalpit?',
      answer:
        'Scalpit actually deposits ₹1 INTO your account (known as penny drop) to verify that the account is active and registered in your name matching your PAN.',
    },
    {
      question: 'What to do if the name on PAN and in the bank is different?',
      answer:
        'The name registered with your bank must closely match your PAN name. Minor spelling differences are handled via fuzzy matching, but significant mismatches require a cancelled cheque or bank statement upload.',
    },
    {
      question: 'What should I do if my bank account is already registered?',
      answer:
        'A single bank account cannot be linked to multiple primary Demat accounts under different PAN numbers. Please provide another savings account in your name.',
    },
    {
      question: 'How to change my bank name?',
      answer:
        'You can select any bank branch by searching for the 11-digit IFSC code provided on your cheque book or passbook.',
    },
    {
      question: 'Why am I unable to add bank account?',
      answer:
        'Check that the account number was entered correctly, the account is not a dormant, NRE/NRO, or joint account where you are a secondary holder, and the IFSC code matches the branch.',
    },
    {
      question: 'How to verify my bank account if penny drop fails?',
      answer:
        'If penny drop fails after retry, you can complete manual bank verification by uploading a clear photograph of a personalized cancelled cheque with your name printed on it.',
    },
  ];

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={() => navigation.goBack()}
        title="Select your issue"
        rightAction={
          <View style={[styles.langToggle, { borderColor: colors.border, borderRadius: radius.round }]}>
            <TouchableOpacity
              onPress={() => setLang('en')}
              style={[
                styles.langBtn,
                lang === 'en' && { backgroundColor: colors.primarySoft },
              ]}
            >
              <AppText
                variant="caption"
                style={{ fontWeight: '700', color: lang === 'en' ? colors.primary : colors.textSecondary }}
              >
                En
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLang('hi')}
              style={[
                styles.langBtn,
                lang === 'hi' && { backgroundColor: colors.primarySoft },
              ]}
            >
              <AppText
                variant="caption"
                style={{ fontWeight: '700', color: lang === 'hi' ? colors.primary : colors.textSecondary }}
              >
                हि
              </AppText>
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {faqs.map((faq, idx) => (
          <AccordionFaqItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            initialExpanded={idx === 0}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  langToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    overflow: 'hidden',
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export default BankFaqScreen;
