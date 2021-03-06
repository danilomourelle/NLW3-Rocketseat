import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/orphanages').then(res => {
      setOrphanages(res.data)
    })
  })

  const handleNavigateToOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id })
  }

  const handleNavigateToCreateOrphanage = () => {
    navigation.navigate('SelectMapPosition')
  }


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.6472155,
          longitude: -46.6421901,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        {
          orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.8,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              >
                <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      {orphanage.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })
        }
      </MapView>

      <View style={styles.footer} >
        <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados </Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#15C3D6',
    color: '#FFFFFF'
  },

  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'nunito700',
    color: '#0089A5',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },

  footerText: {
    fontFamily: 'nunito700',
    color: '#8FA7B3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }
});
