import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// Tipado de recetas
type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
};

// Datos de ejemplo
const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Ensalada César',
    ingredients: ['Lechuga', 'Pollo', 'Queso parmesano', 'Aderezo César'],
    steps: ['Lavar y cortar la lechuga', 'Cocinar el pollo', 'Mezclar todo con el aderezo', 'Servir y disfrutar'],
  },
  {
    id: '2',
    title: 'Pasta al Pesto',
    ingredients: ['Pasta', 'Pesto', 'Queso rallado', 'Aceite de oliva'],
    steps: ['Cocer la pasta', 'Agregar el pesto', 'Mezclar bien', 'Servir con queso rallado'],
  },
];

// Tipado de navegación
export type RootStackParamList = {
  Home: undefined;
  Details: { recipe: Recipe };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  const [search, setSearch] = React.useState('');

  const filteredRecipes = RECIPES.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar receta..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => navigation.navigate('Details', { recipe: item })}
          >
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailsScreen({ route }: any) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>{recipe.title}</Text>
      <Text style={styles.subtitle}>Ingredientes:</Text>
      {recipe.ingredients.map((ing: string, index: number) => (
        <Text key={index} style={styles.detailText}>• {ing}</Text>
      ))}
      <Text style={styles.subtitle}>Pasos:</Text>
      {recipe.steps.map((step: string, index: number) => (
        <Text key={index} style={styles.detailText}>{index + 1}. {step}</Text>
      ))}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Recetas' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalle de receta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
  recipeItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  recipeTitle: { fontSize: 18 },
  detailTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 20, fontWeight: '600', marginTop: 12 },
  detailText: { fontSize: 16, marginVertical: 2 },
});
