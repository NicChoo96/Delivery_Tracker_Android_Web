import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../constants';

class Firebase {
  auth: firebase.auth.Auth;
  database: firebase.database.Database;

  /**
   * @category Firebase
   * @class Firebase
   * @classdesc Creates a firebase interface object instance
   *
   * @property {firebaseAuthObject} auth Authentication details of the current manager
   * @property {firebaseDatabaseSnapshot} database Database snapshot and model
   */
  constructor() {
    // type definitions
    firebaseApp.initializeApp({ ...firebaseConfig });
    this.auth = firebaseApp.auth();
    this.database = firebaseApp.database();
  }

  /**
   * User sign up
   * @param {string} email
   * @param {string} password
   * @return {Promise<any>} firebase new user response
   */
  signUp = (email: string, password: string): Promise<any> => firebaseApp.auth().createUserWithEmailAndPassword(email, password);


  /**
   * User sign in
   * @param {string} email
   * @param {string} password
   * @return {Promise<any>} firebase authentication response
   */
  signIn = (email: string, password: string): Promise<any> => firebaseApp.auth().signInWithEmailAndPassword(email, password);

  /**
   * User signs out
   */
  signOut = (): Promise<any> => this.auth.signOut();

  /**
   * Get all job data
   */
  getAllJobs = (): firebase.database.Reference => this.database.ref('contractors');

  /**
   *  get specific job
   * @param {string} contractorId
   * @param {string} jobId
   */
  getJob = (contractorId: string, jobId: string): firebase.database.Reference => this.database.ref(`contractors/${contractorId}/jobList/${jobId}`);

  /**
   * Get details of current manager based on currently authenticated user
   */
  getCurrentManagerDetails = (): firebase.database.Reference => this.database.ref(`managers/` + this.auth.currentUser!.uid);

  /**
   * Change the details of the current manager
   * @param {string} name new manaager name
   * @param {number} phoneNumber new manager number
   */
  setCurrentManagerDetails = (name: string, phoneNumber: number): Promise<any> => {
    const currentManagerRef = this.database.ref('managers/' + this.auth.currentUser!.uid);
    return currentManagerRef.set({ name: name, phoneNo: phoneNumber });
  }
}

export default new Firebase();
export type { Firebase as FirebaseInterface }
