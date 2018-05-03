import React from 'react'
import {Animated, StyleSheet, View, Text} from 'react-native'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26];

export default class AnimatedScrollViewHeader extends React.Component {
	state = {
		animatedValue: new Animated.Value(0)
	};
	
	renderNonsense = () => {
		return data.map((item) => (
			<View style={styles.nonsenseItem} key={item}>
				<Text style={styles.itemText}>{item}</Text>
			</View>
		))
	};
	render() {
		let translateY = this.state.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: [0, -150],
			extrapolate: 'clamp',
		});

		return (
			<View style={styles.container}>
				<Animated.ScrollView
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {y: this.state.animatedValue}}}],
						// {useNativeDriver: true}
						console.log('translate', translateY,this.state.animatedValue)
					)}>
					{this.renderNonsense()}
				</Animated.ScrollView>
				<Animated.View style={[styles.headerWrapper, {transform: [{translateY}]}]}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightblue',
	},
	nonsenseItem: {
		backgroundColor: 'red',
		margin: 8,
	},
	itemText: {
		backgroundColor: 'blue',
		fontSize: 20,
		padding: 20,
	},
	headerWrapper: {
		position: 'absolute',
		backgroundColor: 'red',
		height: 200,
		left: 0,
		right: 0,
	}
});