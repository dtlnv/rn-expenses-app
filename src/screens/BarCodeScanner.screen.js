import { Camera, CameraType } from 'expo-camera';
import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { fetchProductData, getProduct } from '../utils/barcode.util';
import ExpensesContext from '../store/expenses-context';

export default function BarCodeScannerScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState({});

  function ScannedProduct() {
    function addProduct() {
      setScanned(false);
      expensesContext.addExpense({ description: product?.title, price: product?.price });
      navigation.navigate('AllExpenses');
    }

    function scanAgain() {
      setScanned(false);
    }

    return (
      <View style={styles.noCameraScreen}>
        <Text>{product?.title}</Text>
        <Text>${product?.price}</Text>
        <Button title='Add this product to the list' onPress={addProduct} />
        <Button title='Scan again' onPress={scanAgain} />
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={styles.noCameraScreen}>
        <Text>Requesting permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.noCameraScreen}>
        <Text>No access to camera</Text>
        <Button title='Request permission' onPress={requestPermission} />
      </View>
    );
  }

  if (scanned && product?.title) {
    return <ScannedProduct />;
  }

  async function handleBarCodeScanned(params) {
    const barcode = params.data;
    if (barcode) {
      setScanned(true);
      const data = await fetchProductData(barcode);
      const product = getProduct(data);
      setProduct(product);
    }
  }

  // handleBarCodeScanned({ data: '0016571951603' });

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        onBarCodeScanned={handleBarCodeScanned}
        autoFocus={Camera.Constants.AutoFocus.on}
      ></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  noCameraScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    gap: 16,
  },
});
