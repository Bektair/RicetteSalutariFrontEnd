import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import {FormField, CustomButton} from '../../components'
import {Link, router } from 'expo-router';
import api from "../../Context/api";
import storage from '../../Context/Storage'
import { AccessToken, RefreshToken } from "../../Context/constants";
import { useGlobalContext } from "../../Context/GlobalProvider"


const SignIn = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const { setIsLoggedIn, setLoading } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submit = async () => {
        if (form.username === ""|| form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        setIsSubmitting(true);

        try{

            const res = await api.post("/api/token/", { 
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
                setLoading(false);
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
                    Log in here!
                </Text>

                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(e)=> setForm({...form, username:e})}
                    otherStyles="mt-7"
                />

                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e)=> setForm({...form, password:e})}
                    otherStyles="mt-7"
                />
                <CustomButton 
                    title="Sign In"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">
                        Don't have an account?
                    </Text>
                    <Link href="/sign-up" className='text-lg 
                    font-semibold text-secondary'>Sign up</Link>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn