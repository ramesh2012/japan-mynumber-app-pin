# MyNumber Card Password 

This README provides instructions for converting the MyNumber Card  from Next.js to React Native, along with detailed information about the verification logic and calendar system conversions.

## Overview

The MyNumber Card  is a multi-step form that allows users to:

1. Select and input their date of birth using either Japanese era calendar or Western calendar
2. Enter an expiration year
3. Input a security code
4. Generate a verification number based on the input data

## Key Features

- Support for both Japanese era calendar (和暦) and Western calendar (西暦)
- Automatic conversion between calendar systems
- Multi-step form navigation
- Secure input fields with toggle visibility
- Validation of user inputs
- Verification number generation following specific business rules

## React Native Conversion Guide

### Required Dependencies

```bash
npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler
npm install react-native-safe-area-context react-native-dropdown-picker
npm install react-native-modal react-native-vector-icons
```

### Core Components Mapping

| Web Component | React Native Equivalent |
|---------------|-------------------------|
| Card | View with styling |
| Input | TextInput |
| Select | Dropdown picker or custom dropdown |
| Button | TouchableOpacity/Pressable with styling |
| Image | Image component (with proper sizing) |

### Structure Considerations

1. **Navigation**: Replace the step state with React Navigation stack
2. **Styling**: Convert Tailwind classes to StyleSheet objects
3. **Form Controls**: Replace Select elements with custom dropdowns
4. **Images**: Use React Native Image component with appropriate sizing
5. **Icons**: Use React Native Vector Icons instead of Lucide icons

### Example Structure

```jsx
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BirthDateScreen from './screens/BirthDateScreen';
import ExpiryYearScreen from './screens/ExpiryYearScreen';
import SecurityCodeScreen from './screens/SecurityCodeScreen';
import VerificationResultScreen from './screens/VerificationResultScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BirthDate">
        <Stack.Screen name="BirthDate" component={BirthDateScreen} />
        <Stack.Screen name="ExpiryYear" component={ExpiryYearScreen} />
        <Stack.Screen name="SecurityCode" component={SecurityCodeScreen} />
        <Stack.Screen name="VerificationResult" component={VerificationResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

### Calendar Logic Implementation

The calendar conversion logic should be extracted to utility functions and can remain mostly unchanged:

```jsx
// utils/calendarUtils.js
export const eraToWesternYear = {
  明治: {
    元年: 1868,
    "2年": 1869,
    // ... other years
  },
  大正: {
    元年: 1912,
    // ... other years
  },
  // ... other eras
};

// Generate the reverse mapping (Western to Japanese)
export const westernYearToEra = {};
Object.entries(eraToWesternYear).forEach(([era, years]) => {
  Object.entries(years).forEach(([yearStr, westernYear]) => {
    westernYearToEra[westernYear] = { era, year: yearStr };
  });
});

// Other utility functions can be directly converted
```

### Verification Number Generation

The verification number generation logic can be reused with minimal changes:

```jsx
// utils/verificationUtils.js

// Convert Japanese date to 6-digit format
export const convertJapaneseDateTo6Digits = (era, year, month, day) => {
  if (!era || !year || !month || !day) return "";

  // Handle special case for "元年" (first year)
  let yearDigits = "01";
  if (year !== "元年") {
    const yearNum = Number.parseInt(year.replace("年", ""));
    yearDigits = yearNum.toString().padStart(2, "0");
  }

  const monthNum = Number.parseInt(month.replace("月", ""));
  const dayNum = Number.parseInt(day.replace("日", ""));

  // Format as YYMMDD
  const monthStr = monthNum.toString().padStart(2, "0");
  const dayStr = dayNum.toString().padStart(2, "0");

  return `${yearDigits}${monthStr}${dayStr}`;
};

// Convert Western date to 6-digit format
export const convertWesternDateTo6Digits = (year, month, day) => {
  // Same implementation as in web version
};

// Generate the verification number
export const generateVerificationNumber = (
  calendarType,
  japaneseEra,
  japaneseYear,
  japaneseMonth,
  japaneseDay,
  westernYear,
  westernMonth,
  westernDay,
  expiryYear,
  securityCode
) => {
  let birthdate = "";
  
  if (calendarType === "和暦") {
    birthdate = convertJapaneseDateTo6Digits(japaneseEra, japaneseYear, japaneseMonth, japaneseDay);
  } else {
    birthdate = convertWesternDateTo6Digits(westernYear, westernMonth, westernDay);
  }
  
  return `${birthdate}${expiryYear}${securityCode}`;
};
```

## Component Example: BirthDateScreen

Here's an example of how the BirthDate screen would look in React Native:

```jsx
// screens/BirthDateScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { generateJapaneseYears, generateWesternYears, generateMonths, generateDays } from '../utils/calendarUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

const BirthDateScreen = ({ navigation, route }) => {
  const [calendarType, setCalendarType] = useState('和暦');
  const [japaneseEra, setJapaneseEra] = useState('昭和');
  const [japaneseYear, setJapaneseYear] = useState('31年');
  const [japaneseMonth, setJapaneseMonth] = useState('10月');
  const [japaneseDay, setJapaneseDay] = useState('5日');
  const [westernYear, setWesternYear] = useState('1998年');
  const [westernMonth, setWesternMonth] = useState('9月');
  const [westernDay, setWesternDay] = useState('12日');
  
  // Dropdown open states
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [eraOpen, setEraOpen] = useState(false);
  // ... other states for dropdown pickers
  
  // Handle navigation to next screen
  const handleNext = () => {
    navigation.navigate('ExpiryYear', {
      calendarType,
      japaneseEra,
      japaneseYear,
      japaneseMonth,
      japaneseDay,
      westernYear,
      westernMonth,
      westernDay
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>生年月日の選択</Text>
        
        <Text style={styles.label}>暦（書類に記載の暦に合わせて選択）</Text>
        <DropDownPicker
          open={calendarOpen}
          value={calendarType}
          items={[
            {label: '和暦', value: '和暦'},
            {label: '西暦', value: '西暦'}
          ]}
          setOpen={setCalendarOpen}
          setValue={setCalendarType}
          placeholder="暦を選択"
          style={styles.dropdown}
          // ... other props
        />
        
        {/* Rest of the form controls based on calendarType */}
        
        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonOutline]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonOutlineText}>戻る</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonPrimary]} 
            onPress={handleNext}
          >
            <Text style={styles.buttonPrimaryText}>次へ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // ... other styles
});

export default BirthDateScreen;
```

## Performance Considerations

1. **Memoization**: Use `useMemo` for expensive calculations like calendar conversions
2. **State Management**: Consider using Context API or Redux for global state management
3. **Image Optimization**: Optimize images for mobile screens and caching
4. **Text Input**: Implement proper keyboard types for numeric inputs
5. **Accessibility**: Ensure the app is accessible with proper labels and focus management

## Testing the React Native Implementation

1. **Manual Testing**: Test on both iOS and Android devices
2. **Jest/Testing Library**: Create unit tests for the utility functions and UI components
3. **E2E Testing**: Set up Detox for end-to-end testing

## Japanese Calendar System Notes

The Japanese calendar system is based on eras (元号) which are tied to the reign of emperors. The current era is Reiwa (令和), which began on May 1, 2019. Previous eras include:

- Heisei (平成): January 8, 1989 to April 30, 2019
- Showa (昭和): December 25, 1926 to January 7, 1989
- Taisho (大正): July 30, 1912 to December 25, 1926
- Meiji (明治): January 25, 1868 to July 30, 1912

When working with Japanese dates:
- The first year of an era is called "元年" (gannen)
- Subsequent years are written as "2年", "3年", etc.
- Always handle "元年" correctly as "01" in numeric representations

## Security Considerations

1. **Sensitive Information**: Treat birthdate and security code as sensitive information
2. **Input Validation**: Validate all user inputs to prevent issues
3. **Secure Storage**: Use secure storage for any saved verification numbers
4. **PIN Visibility**: Implement show/hide functionality for security-sensitive fields

## Conclusion

Converting this form to React Native requires careful attention to the UI components, calendar logic, and form flow, but the core verification logic can be reused with minimal changes. The resulting React Native application should provide the same functionality with a native mobile experience.
