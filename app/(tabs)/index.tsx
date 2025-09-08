
import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {

  const {toggleDarkMode, colors} = useTheme();

  const todoList = useQuery(api.todos.getTodos);
  console.log(todoList, 'yyy')

  // const addTodo = useMutation(api.todos.addTodo)
  //  const clearAllTodos = useMutation(api.todos.clearAllTodos)

  // the middle of the application is in the safe area view using View as the div makes the text go to the top!.

  const homeStyles = createHomeStyles(colors)
  return (

    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>

      <StatusBar barStyle={colors.statusBarStyle}/>

    <SafeAreaView
      style={homeStyles.safeArea}>
      {/* <Text style={homeStyles.subContent}>O Yahuah Reveal yourself to me </Text> */}

      <Header/>
      {/* <Text>Hi</Text> */}

      <TodoInput/>


    {todoList &&
    
    todoList?.map((todo) => (
      <Text key={todo._id}>
        {todo?.text}</Text>
    ))}

      <TouchableOpacity onPress={toggleDarkMode}><Text>Toggle the Mode</Text></TouchableOpacity>

          {/* <TouchableOpacity onPress={() => addTodo({ text:'To Finish Rent now and pay later.'})}><Text>Add a new Todo</Text></TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => clearAllTodos()}><Text>Clear All</Text></TouchableOpacity>  */}
    </SafeAreaView>
     </LinearGradient>
    // <View
    //  style={styles.container}>
    //   <Text style={styles.content}></Text>
    // 
    // </View> 
  );
}

// const createStyles = (colors:ColorScheme)=> {

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colors.bg,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   subContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: 30,
//     color: "blue",
//   }

// })

// return styles
// }



