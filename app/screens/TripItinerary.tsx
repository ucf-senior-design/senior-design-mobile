import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../navigators"
import { SafeAreaView, View, StyleSheet, Modal } from "react-native"
import { colors } from "../theme"
import { Avatar, IndexPath, Select, SelectItem } from "@ui-kitten/components"
import { Trip, Duration } from "../../types/trip"
import { JoinEvent } from "../components/Dashboard/JoinEvent"
import { TripHeader } from "../components/Dashboard/TripHeader"
import Timeline from "react-native-timeline-flatlist"
import { Icon, Text } from "../components"
import { EventInfo } from "../components/Dashboard/EventInfo"

type TripItineraryProps = AppStackScreenProps<"TripItinerary">
export function getTime(date: Date) {
  return date.toLocaleDateString([], { month: "long", day: "2-digit" })
}

export function printDay(row: number, trip: Trip) {
  const day: Date = trip.duration.start
  day.setDate(day.getDate() + row)
  return getTime(day)
}

export function getDuration(duration: Duration) {
  // Need to check for minute rather than just put hour
  return (
    duration.start.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "") +
    " - " +
    duration.end.toLocaleTimeString([], { hour: "2-digit" }).replaceAll(" ", "")
  )
}

export const TripItinerary: FC<TripItineraryProps> = observer(function TripItineraryScreen() {
  const trips = [
    {
      destination: "Orlando",
      uid: "uid",
      attendees: [],
      duration: { start: new Date(), end: new Date() },
      image: "https://live.staticflickr.com/7171/6587698657_18a7326eb7_b.jpg",
    },
  ]
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))

  const sample = [
    {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
  ]
  const sampleEvent = [
    {
      uid: "uid",
      title: "Titles",
      attendees: ["Array<string>","Array<string>", ],
      duration: { start: new Date(), end: new Date() },
      location: "Location",
      description: "Description",
    },
    {
      uid: "uid",
      title: "Titles2",
      attendees: ["Array<string>"],
      duration: { start: new Date(), end: new Date() },
      location: "Location",
      description: "Description",
    },
    {
      uid: "uid",
      title: "Titles2",
      attendees: ["Array<string>"],
      duration: { start: new Date(), end: new Date() },
      location: "Location",
      description: "Description",
    },
  ]
  const renderDetail = (rowData, sectionID, rowID) => {
    let title = (
    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Text text={rowData.title} preset="bold" size="md"/>
        <Text
        text={getDuration(rowData.duration)}
        style={{ paddingRight: 10 }}
        size="xxs"
        />
      </View>
      )
    var desc = null;
    if (rowData.description)
      desc = (
        <View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>

          <View style={{flexDirection: "row"}}>
          <Icon icon="personSmall" size={20}/>
            <Text 
            style={{paddingLeft: 10}}
            text={rowData.location}
            size="sm"
            />
            </View>
            <View style={{flexDirection: "row"}}>              
          <Icon icon="personSmall" size={20}/>
            <Text
          text="deg"
          preset="formHelper"
          style={{ paddingRight: 10, paddingLeft: 5 }}
          size="xxs"
          />
            </View>
            
          </View>
          <View style={{flexDirection: "row", paddingTop: 10}}>
          {rowData.attendees.map((attendee) => {
            return (
              <View key={Math.random()} style={{paddingRight: 10}}>
                <Avatar
                key={Math.random()}
                size="small"
                  source={{
                    uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
                  }}
                />
                </View>
                )
              })}
              </View>
        </View>
      );

    return (
      <View style={{flex: 1}}>
        {title}
        {desc}
      </View>
    );
  };

  const data = [
    {
      time: '09:00',
      title: 'Event 1',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
      lineColor: '#009688',
      icon: require('../../assets/icons/person.png'),
      imageUrl:
        'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
    },
    {
      time: '10:45',
      title: 'Event 2',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        icon: require('../../assets/icons/person.png'),
      imageUrl:
        'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      padding: 16,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    rowTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "white"
    },
    descriptionContainer: {
      flexDirection: 'row',
      paddingRight: 50,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textDescriptionStyle: {
      marginLeft: 10,
      color: 'gray',
    },
  });

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: "100%" }}>
      <TripHeader trip={trips[0]} />
      <View style={{ alignItems: "center" }}>
        <Select
          placeholder="Date"
          style={{ width: "95%" }}
          value={printDay(selectedIndex.row, trips[0])}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index)
          }}
        >
          <SelectItem title={"February 23"} />
          <SelectItem title={"February 24"} />
          <SelectItem title={"February 25"} />
        </Select>
        <View style={{ backgroundColor: "white", height: 2, width: "95%" }} />
      </View>
      <JoinEvent event={sampleEvent[0]}></JoinEvent>
      <Timeline
        data={sampleEvent}
        circleSize={20}
        circleColor="white"
        lineColor="white"
        lineWidth={5}
        renderFullLine={true}
        showTime={false}
        onEventPress={(item) => {
          return (
              <EventInfo event={item[0]}/>
          )}
        }
        renderDetail={renderDetail}
      />
    </SafeAreaView>
  )
})
