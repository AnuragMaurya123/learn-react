
import Config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(Config.appwriteUrl)
        .setProject(Config.appwriteProjectId)
        this.account=new Account(this.client)
     
    }

    async createAccount({email,password,name}){
        try {
           const userAccount= await this.account.create(ID.unique(),email,password,name);
           if (userAccount) {
            console.log(userAccount)
             return this.login({email,password})
            
           } else {
            return userAccount
           }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
          return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
         const result= await this.account.get();
         
         return result
        } catch (error) {
            throw error;
            }
            
        }
   
    

    async logout(){
        try {
          return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService=new AuthService();

export default authService