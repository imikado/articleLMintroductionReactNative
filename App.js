import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      productToAdd: {},
      productToUpdate: null,
    };

  }

  updateStateProduct(text_) {
    let productToAdd = this.state.productToAdd;
    productToAdd.texte = text_;

    this.setState({ productToAdd: productToAdd });
  }
  updateStateProductToUpdate(text_) {
    let productToUpdate = this.state.productToUpdate;
    productToUpdate.texte = text_;

    this.setState({ productToUpdate: productToUpdate });
  }

  addProduct() {
    let productList = this.state.productList;
    let productToAdd = this.state.productToAdd;
    productToAdd.id = productList.length;
    productList.push(productToAdd);

    this.setState({ productList: productList, productToAdd: {} });
  }
  updateProduct() {
    let productList = this.state.productList;
    for (let i in productList) {
      if (productList[i].id == this.state.productToUpdate.id) {
        productList[i].texte = this.state.productToUpdate.texte;
      }
    }
    this.setState({ productList: productList, productToUpdate: null });

  }

  showModal(product_) {
    this.setState({ productToUpdate: product_ });
  }
  hideModal() {
    this.setState({ productToUpdate: null });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView >
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Liste à acheter</Text>

              <View style={styles.sectionDescription}>
                {
                  this.state.productList.length === 0
                    ?
                    <Text>Aucun produit pour le moment</Text>
                    :
                    this.state.productList.map((product) =>

                      <View key={product.id} flexDirection="row">
                        <TouchableHighlight
                          onPress={() => this.showModal(product)}>
                          <Text>{product.texte}</Text>
                        </TouchableHighlight>
                      </View>
                    )
                }
              </View>

              <View >
                <TextInput placeholder="Ajouter un produit"
                  value={this.state.productToAdd.texte}
                  onChangeText={(text_) => this.updateStateProduct(text_)}
                  onEndEditing={() => this.addProduct()}
                  style={styles.inputAdd} ></TextInput>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={(this.state.productToUpdate !== null)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TextInput onEndEditing={() => this.updateProduct()}
                      value={this.state.productToUpdate !== null ? this.state.productToUpdate.texte : null}
                      onChangeText={(text_) => this.updateStateProductToUpdate(text_)}

                      style={styles.inputUpdate}
                    ></TextInput>


                    <TouchableHighlight
                      onPress={() => this.hideModal()} >
                      <Text style={styles.textStyle}>Annuler</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  inputAdd: { flex: 1, height: 40, backgroundColor: '#ddd' },
  inputUpdate: { height: 40, width: 200, borderColor: 'gray', borderWidth: 1 },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

});

export default App;
