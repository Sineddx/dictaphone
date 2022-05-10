import { Colors, ActivityIndicator } from "react-native-paper";

export default function LoadingScreen(){
    return (
        <ActivityIndicator animating={true} color={Colors.purple800} style={{justifyContent: 'center', flex: 1}}/>
    )
}
