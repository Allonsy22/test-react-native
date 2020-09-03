import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const SOUND = '../assets/aumiUUU.mp3';

export default class AudioRecord extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        isRecord: false,
    };

    componentDidMount() {
        this.getPermission();
        axios.post('https://dialogflow-allonsy.herokuapp.com/test', SOUND, {
            headers: { 'content-type': 'audio/mp3' },
            responseType: 'blob',
        })
            .then(async response => {
                try {
                    // const soundObject = new Audio.Sound();
                    // await soundObject.loadAsync(response.data);
                    // await soundObject.playAsync();
                    const blob = new Blob([response.data], {type: 'audio/mp3'});
                    console.log(blob);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(error => console.log(error));
    };

    async getPermission() {
        const { status, expires, permissions } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );
    };

    async playAudio() {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
                require("../assets/aumiUUU.mp3"),
                { shouldPlay: true }
            );
        } catch (error) {
            console.log(error);
        }

    };

    async startAudioRecord() {
        this.recording = new Audio.Recording();
        this.setState({ isRecord: true });
        try {
            await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
            await this.recording.startAsync()
                .then((status) => {
                    console.log(status);
                })
                .catch(error => {
                    console.log(error);
                });
            // You are now recording!
        } catch (error) {
            console.log(error);
        }
    };

    async stopAudioRecord() {
        this.setState({ isRecord: false });
        this.recording.stopAndUnloadAsync()
            .then(() => {
                this.recording.createNewLoadedSoundAsync().then(async result => {
                    const sound = result.sound;
                    await sound.playAsync();
                    this.uri = this.recording.getURI();
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    async getInfoAboutFile() {
        await FileSystem.getInfoAsync(this.uri)
            .then(result => console.log(result))
            .catch(error => console.log(error));
        //await FileSystem.uploadAsync(url, fileUri, options);
    };

    render() {
        const { isRecord } = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.playAudio()}>
                    <Text>Play</Text>
                </TouchableOpacity>
                <View style={styles.recordContainer}>
                    {!isRecord
                        ?
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: "blue" }
                            ]}
                            onPress={() => this.startAudioRecord()}
                        >
                            <Text style={{ color: 'white' }}>Record</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: "red" }
                            ]}
                            onPress={() => this.stopAudioRecord()}
                        >
                            <Text style={{ color: 'white' }}>Stop</Text>
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: "green" }
                    ]}
                    onPress={() => this.getInfoAboutFile()}
                >
                    <Text style={{ color: 'white' }}>Get info about audio file</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    recordContainer: {
        flexDirection: 'row',
        width: 400,
        height: 100,
        marginVertical: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'grey'
    },
    button: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
