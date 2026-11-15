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

export const PanFaqScreen: React.FC = () => {
  const { colors, spacing, radius } = useTheme();
  const navigation = useNavigation();
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const faqs = [
    {
      question: 'Why does Scalpit need my PAN number?',
      answer:
        'As mandated by SEBI and the Prevention of Money Laundering Act (PMLA), verifying your Permanent Account Number (PAN) is compulsory to open a Demat & Trading account in India. It links your investment portfolio directly with exchanges and tax authorities.',
    },
    {
      question: 'My PAN already exists. What to do?',
      answer:
        'If your PAN is already registered with an existing account on Scalpit, please log in using the mobile number or email associated with that account. If you forgot your login details, tap "Forgot Password" or contact investor support.',
    },
    {
      question: 'What should I do if I have more than one PAN?',
      answer:
        'Under Section 272B of the Income Tax Act, holding more than one PAN card is unlawful and subject to penalties. You must surrender the duplicate PAN to the Income Tax Department and use only your active valid PAN.',
    },
    {
      question: 'Why is my PAN not getting verified? Can I update my PAN details?',
      answer:
        'PAN verification failures usually occur when your name or date of birth on PAN differs from Income Tax records or Aadhaar. Ensure your details match official NSDL/UTIITSL databases. You can request a PAN correction via the NSDL portal.',
    },
    {
      question: 'How can I change my PAN on Scalpit?',
      answer:
        'Once a Demat account is opened, your PAN is permanently tied to your exchange broker ID. To change your PAN, submit an official Demat modification form accompanied by gazette notification or court order proof.',
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

export default PanFaqScreen;
