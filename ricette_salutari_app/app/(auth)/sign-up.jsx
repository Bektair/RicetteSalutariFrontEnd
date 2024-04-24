import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { ProtectedRoute } from "../../Context/GlobalProvider"
import api from "../../Context/api";
import { AccessToken, RefreshToken } from "../../Context/constants";
import { useGlobalContext } from "../../Context/GlobalProvider"
import storage from '../../Context/Storage'
import {Link, router } from 'expo-router';


const SignUp = () => {
    const { setIsLoggedIn } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const submit = async () => {
        // || form.email === "" 
        if (form.username === ""|| form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }
    
        setIsSubmitting(true);

        try{

            const res = await api.post("/api/user/register/", { 
                    username: form.username,
                    password: form.password
            });
            storage.save({
                key: RefreshToken,
                data:{ 
                    token: res.data.refresh
                },
                key: AccessToken,
                data: {
                    token: res.data.access
                }
            });
            if(res.status==200){
                setIsLoggedIn(true);
                router.replace("/home");
            }
            else{
                router.replace("/sign-in");
            }
        }catch(error)
        {
            alert(error)
        }finally{
        setIsSubmitting(false)
        }
    }
  return (
    <SafeAreaView className = "bg-primary h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"></Image>

                <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                    Sign up here!
                </Text>

                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(e)=> setForm({...form, username:e})}
                    otherStyles="mt-10"
                />

                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e)=> setForm({...form, email:e})}
                    otherStyles="mt-7"
                    keyboardType="email-address"
                />

                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e)=> setForm({...form, password:e})}
                    otherStyles="mt-7"
                />
                <CustomButton 
                    title="Sign Up"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">
                        Have an account allready
                    </Text>
                    <Link href="/sign-in" className='text-lg 
                    font-semibold text-secondary'>Sign in</Link>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp