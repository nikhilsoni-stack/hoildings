import React, {Children} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';

interface PageProps {
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({isLoading, isError, retry, children}) => {
  const renderItem = isError ? (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>Something when wrong please try agin</Text>
      <Button onPress={retry} title="retry" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  );
  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    renderItem
  );
};

export default Page;
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  errorView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
    marginBottom: 32,
  },
});
