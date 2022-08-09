import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import images from './src/assets/image';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=1',
      );
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApi();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity>
              <Image source={images.Back} style={styles.iconBack} />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Back</Text>
          </View>
          <Text style={styles.titleContent}>Popular list</Text>
          <View style={styles.listContentHeader}>
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator size={'large'} color={'blue'} />
              </View>
            ) : (
              data?.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.contentBlock} key={index}>
                    <Image
                      resizeMode="cover"
                      style={styles.imageContent}
                      source={{
                        uri: 'https://www.baltimorestyle.com/wp-content/uploads/2019/12/jumanji.jpg',
                      }}
                    />
                    <View style={styles.rage}>
                      <Text style={[styles.first, styles.colorText]}>
                        {String(item.vote_average).slice(0, 1)}
                      </Text>
                      <Text style={[styles.second, styles.colorText]}>
                        {String(item.vote_average).slice(1, 3)}
                      </Text>
                    </View>
                    <View style={styles.blockFooter}>
                      <Text style={styles.colorText}>
                        {item.release_date.slice(0, 4)}
                      </Text>
                      <Text
                        style={[styles.colorText, styles.fontSize]}
                        numberOfLines={1}>
                        {item.title || 'tgitle'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {width: '100%', flexDirection: 'row'},
  iconBack: {width: 20, height: 20, marginRight: 10},
  textHeader: {fontSize: 16},
  titleContent: {
    marginTop: 20,
    fontSize: 15,
    color: '#948784',
    fontWeight: 'bold',
  },
  listContentHeader: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  contentBlock: {
    width: '48%',
    height: 240,
    backgroundColor: 'blue',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginTop: 16,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  blockFooter: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 8,
    zIndex: 99,
  },
  colorText: {color: 'white'},
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSize: {
    fontSize: 15,
  },
  rage: {
    position: 'absolute',
    top: 5,
    right: 8,
    width: 30,
    height: 30,
    backgroundColor: 'orange',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  first: {fontSize: 17},
  second: {fontSize: 12},
});
export default App;
