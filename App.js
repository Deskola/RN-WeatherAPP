import React from "react";
//import {StatusBar} from 'expo-status-bar';
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    StatusBar,
    Text,
    View
} from 'react-native';

/*Local imports*/
import getImageForWeather from "./utils/getImageForWeather";
import SearchInput from "./components/SearchInput";
import { fetchWeatherInfo } from "./utils/api";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            location: '',
            temperature: 0,
            weather: '',
        };
    }

    componentDidMount() {
        this.handleUpdateLocation('Nairobi');
    }

    handleUpdateLocation = (city) => {
        if (!city) return;

        this.setState({ loading: true }, async () => {
            try {
                const { location, weather, temperature } = await fetchWeatherInfo(city);

                this.setState({
                    loading: false,
                    error: false,
                    location,
                    temperature,
                    weather
                });
            } catch (e) {
                this.setState({
                    loading: false,
                    error: true
                });
            }
        });
    }
    render() {
        const { loading, error, location, temperature, weather } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle="light-content" />
                <ImageBackground
                    source={getImageForWeather(weather)}
                    style={styles.imageContainer}
                    imageStyle={styles.image}
                >
                    <View style={styles.detailsContainer}>
                        <ActivityIndicator animating={loading} color="white" size="large" />

                        {!loading && (
                            <View>
                                {error && (
                                    <Text style={[styles.smallText, styles.textStyle]}>
                                        Could not load weathe, please try a different city.
                                    </Text>
                                )}

                                {!error && (
                                    <View>
                                        <Text style={[styles.largeText, styles.textStyle]}>
                                            {location}
                                        </Text>
                                        <Text style={[styles.smallText, styles.textStyle]}>
                                            {weather}
                                        </Text>
                                        <Text style={[styles.largeText, styles.textStyle]}>
                                            {`${Math.round(temperature)}`} &#8451;
                                        </Text>
                                    </View>

                                )}
                                <SearchInput
                                    placeholder="Search any city"
                                    onSubmit={this.handleUpdateLocation}
                                />

                            </View>
                        )}
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495E',
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',
        ...Platform.select({
            ios: {
                fontFamily: 'AvenirNext-Regular',
            },
            android: {
                fontFamily: 'Poppins'
            },
            web: {
                fontFamily: 'Roboto'
            }
        }),

    },
    largeText: {
        fontSize: 44,
    },
    smallText: {
        fontSize: 18
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 20
    }



});
