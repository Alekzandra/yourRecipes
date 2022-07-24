# YourRecipes / Testy
Podane niżej scenariusze i przypadki testowe mają na celu zweryfikowanie głównych funkcjonalności aplikacji. Nie zostały pokryte wszystkie możliwe ścieżki. 

## Scenariusz 1. Nawigowanie po stronie internetowej za pomocą paska nawigacyjnego

### Przypadek testowy 1.1. 
* Tytuł: Poprawne nawigowanie 
* Środowisko: http://localhost:3000/
* Warunek wstępny: Poprawnie załadowana strona główna
* Kroki reprodukcji:
	1. Kliknięcie zakładki "Home"
	Oczekiwany Rezultat: Zakładka "Home" załadowała się poprawnie
	2. Kliknięcie zakładki "About"
	Oczekiwany Rezultat: Zakładka "About" załadowała się poprawnie
	3. Kliknięcie zakładki "Tags"
	Oczekiwany Rezultat: Zakładka "Tags" załadowała się poprawnie
	4. Kliknięcie zakładki "Recipes"
	Oczekiwany Rezultat: Zakładka "Recipes" załadowała się poprawnie
	5. Kliknięcie zakładki "Add recipe"
	Oczekiwany Rezultat: Zakładka "Add recipe" załadowała się poprawnie
* Oczekiwany rezultat: Wszystkie dostępne zakładki załadowały się poprawnie
* Warunki końcowe: Zawartość wszystkich dostępnych zakładek jest widoczna po przejściu na daną zakładkę


## Scenariusz 2. Wyświetlanie przepisów według oznaczeń "tag"

###Przypadek testowy 2.1.
* Tytuł: Poprawne wyświetlenie przepisów po znaczniku "tag"
* Środowisko: http://localhost:3000/
* Warunek wstępny: Poprawnie załadowana strona główna i dodany co najmniej jeden przepis
* Kroki reprodukcji: 
	1. Kliknięcie zakładki "Tags"
	Oczekiwany Rezultat: Zakładka "Tags" załadowała się poprawnie, widoczne są dostępne znaczniki "tags"
	2. Kliknięcie pierwszego znacznika "Breakfast"
	Oczekiwany Rezultat: Na stronie wyświetliły się przepisy zawierające znacznik "Breakfast"
* Oczekiwany rezultat: Przepisy zawierające znacznik wyświetliły się poprawnie
* Warunki końcowe: Wyświetlone przepisy zawierające znacznik "Breakfast"


## Scenariusz 3. Wyświetlenie pojedynczego przepisu z listy przepisów

###Przypadek testowy 3.1.
* Tytuł: Poprawne wyświetlenie pojedynczego przepisu z listy przepisów
* Środowisko: http://localhost:3000/
* Warunek wstępny: Poprawnie załadowana strona główna i dodany co najmniej jeden przepis
* Kroki reprodukcji: 
	1. Kliknięcie zakładki "Recipes"
	Oczekiwany Rezultat: Zakładka "Recipes" załadowała się poprawnie, widoczne są wszystkie dostępne przepisy
	2. Kliknięcie przepisu "Omelette"
	Oczekiwany Rezultat: Przepis "Omelette" załadował się poprawnie, widoczne są wszystkie szczegóły przepisu
* Oczekiwany rezultat: Poprawne wyświetlenie przepisu
* Warunki końcowe: Wybrany przepis załadował się poprawnie


## Scenariusz 4. Dodawanie przepisu za pomocą formularza "Add recipe"

###Przypadek testowy 4.1.
* Tytuł: Poprawne dodanie przepisu do książki przepisów
* Środowisko: http://localhost:3000/
* Warunek wstępny: Poprawnie załadowana strona główna
* Kroki reprodukcji: 
	1. Kliknięcie zakładki "Add Recipe" 
	2. Wprowadzenie tekstu w polu "Name"
	3. Wprowadzenie tekstu  w polu "Description"
	4. Wprowadzenie adresu URL zdjęcia przepisu w polu "Image URL"
	5. Wprowadzenie liczby w polu "Preparation time"
 	6. Wprowadzenie liczby w polu "Cooking time"
	7. Wprowadzenie liczby w polu "No of servings"
	8. Wprowadzenie tekstu w polu "Tags"
	9. Wprowadzenie tekstu w polu "Add ingredient"
	10. Wprowadzenie tekstu w polu "Add instruction"
	11. Kliknięcie przycisku "Add the recipe"
* Oczekiwany rezultat: Poprawne dodanie przepisu i wyświetlenie strony "success"
* Warunki końcowe: Przepis został dodany poprawnie i wyświetlona została informacja o poprawnym dodaniu

