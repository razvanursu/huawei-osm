import { Image, Text } from "@rneui/themed"
import React from "react"
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native"
import FullScreenImage from "../../components/FullScreenImage/FullScreenImage"
import ImageHeader from "../../components/FullScreenImage/ImageHeader"
import UserEntry from "../../components/UserEntry/UserEntry"
import { EventStoryEntryFragment } from "../../generated/types"
import { EventStoriesScreenProps } from "./EventStoriesScreen"

interface StoryShowProps extends EventStoriesScreenProps {
    stories: EventStoryEntryFragment[]
}

const StoryShow: React.FC<StoryShowProps> = ({ stories, navigation }) => {
    const [currentStoryIdx, setCurrentStoryIdx] = React.useState(0)

    const goToPreviousStory = () => setCurrentStoryIdx(Math.max(currentStoryIdx - 1, 0))

    const goToNextStory = () => {
        const idx = currentStoryIdx + 1
        console.log(idx)
        if(idx >= stories.length){
            console.log("here")
            navigation.goBack()
        }
        else {
            setCurrentStoryIdx(idx)
        }
    }


    const currentStory = stories[currentStoryIdx]

    return (
        <FullScreenImage
            key={currentStoryIdx}
            progressDuration={10}
            imageUrl={currentStory.url}
            header={<ImageHeader
                avatarUrl={currentStory.author.profilePicture || ""}
                title={currentStory.author.username}
            />}
            onClickRight={goToNextStory}
            onClickLeft={goToPreviousStory}
        />
    )
}

export default StoryShow