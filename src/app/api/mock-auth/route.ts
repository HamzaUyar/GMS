import { NextResponse } from 'next/server';

// --- Mock Data Provided by User ---
const mockData = {
  advisors: [
    { "id": 1, "name": "Physics Advisor", "email": "advisor.physics@example.com", "type": "Professor", "departmentId": 20, "password": "password_advisor_1" },
    { "id": 2, "name": "Photonics Advisor", "email": "advisor.photonics@example.com", "type": "Professor", "departmentId": 21, "password": "password_advisor_2" },
    { "id": 3, "name": "Chemistry Advisor", "email": "advisor.chemistry@example.com", "type": "Professor", "departmentId": 22, "password": "password_advisor_3" },
    { "id": 4, "name": "Mathematics Advisor", "email": "advisor.mathematics@example.com", "type": "Professor", "departmentId": 23, "password": "password_advisor_4" },
    { "id": 5, "name": "MolBioGen Advisor", "email": "advisor.molbiogen@example.com", "type": "Professor", "departmentId": 24, "password": "password_advisor_5" },
    { "id": 6, "name": "CompEng Advisor", "email": "advisor.compeng@example.com", "type": "Professor", "departmentId": 25, "password": "password_advisor_6" },
    { "id": 7, "name": "BioEng Advisor", "email": "advisor.bioeng@example.com", "type": "Professor", "departmentId": 26, "password": "password_advisor_7" },
    { "id": 8, "name": "EnvEng Advisor", "email": "advisor.enveng@example.com", "type": "Professor", "departmentId": 27, "password": "password_advisor_8" },
    { "id": 9, "name": "EnergySysEng Advisor", "email": "advisor.energysyseng@example.com", "type": "Professor", "departmentId": 28, "password": "password_advisor_9" },
    { "id": 10, "name": "EEE Advisor", "email": "advisor.eee@example.com", "type": "Professor", "departmentId": 29, "password": "password_advisor_10" },
    { "id": 11, "name": "FoodEng Advisor", "email": "advisor.foodeng@example.com", "type": "Professor", "departmentId": 30, "password": "password_advisor_11" },
    { "id": 12, "name": "CivilEng Advisor", "email": "advisor.civileng@example.com", "type": "Professor", "departmentId": 31, "password": "password_advisor_12" },
    { "id": 13, "name": "ChemEng Advisor", "email": "advisor.chemeng@example.com", "type": "Professor", "departmentId": 32, "password": "password_advisor_13" },
    { "id": 14, "name": "MechEng Advisor", "email": "advisor.mecheng@example.com", "type": "Professor", "departmentId": 33, "password": "password_advisor_14" },
    { "id": 15, "name": "MatSciEng Advisor", "email": "advisor.matscieng@example.com", "type": "Professor", "departmentId": 34, "password": "password_advisor_15" },
    { "id": 16, "name": "IndDesign Advisor", "email": "advisor.inddesign@example.com", "type": "Professor", "departmentId": 35, "password": "password_advisor_16" },
    { "id": 17, "name": "Arch Advisor", "email": "advisor.arch@example.com", "type": "Professor", "departmentId": 37, "password": "password_advisor_17" },
    { "id": 18, "name": "CityPlan Advisor", "email": "advisor.cityplan@example.com", "type": "Professor", "departmentId": 38, "password": "password_advisor_18" }
  ],
  students: [
    { "id": 1, "name": "Physics Student 1", "email": "student.physics1@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_1" },
    { "id": 2, "name": "Physics Student 2", "email": "student.physics2@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_2" },
    { "id": 3, "name": "Physics Student 3", "email": "student.physics3@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_3" },
    { "id": 4, "name": "Physics Student 4", "email": "student.physics4@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_4" },
    { "id": 5, "name": "Physics Student 5", "email": "student.physics5@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_5" },
    { "id": 6, "name": "Physics Student 6", "email": "student.physics6@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_6" },
    { "id": 7, "name": "Physics Student 7", "email": "student.physics7@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_7" },
    { "id": 8, "name": "Physics Student 8", "email": "student.physics8@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_8" },
    { "id": 9, "name": "Physics Student 9", "email": "student.physics9@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_9" },
    { "id": 10, "name": "Physics Student 10", "email": "student.physics10@example.com", "departmentId": 20, "advisorId": 1, "password": "password_student_10" },
    { "id": 11, "name": "Photonics Student 1", "email": "student.photonics1@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_11" },
    { "id": 12, "name": "Photonics Student 2", "email": "student.photonics2@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_12" },
    { "id": 13, "name": "Photonics Student 3", "email": "student.photonics3@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_13" },
    { "id": 14, "name": "Photonics Student 4", "email": "student.photonics4@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_14" },
    { "id": 15, "name": "Photonics Student 5", "email": "student.photonics5@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_15" },
    { "id": 16, "name": "Photonics Student 6", "email": "student.photonics6@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_16" },
    { "id": 17, "name": "Photonics Student 7", "email": "student.photonics7@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_17" },
    { "id": 18, "name": "Photonics Student 8", "email": "student.photonics8@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_18" },
    { "id": 19, "name": "Photonics Student 9", "email": "student.photonics9@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_19" },
    { "id": 20, "name": "Photonics Student 10", "email": "student.photonics10@example.com", "departmentId": 21, "advisorId": 2, "password": "password_student_20" },
    { "id": 21, "name": "Chemistry Student 1", "email": "student.chemistry1@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_21" },
    { "id": 22, "name": "Chemistry Student 2", "email": "student.chemistry2@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_22" },
    { "id": 23, "name": "Chemistry Student 3", "email": "student.chemistry3@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_23" },
    { "id": 24, "name": "Chemistry Student 4", "email": "student.chemistry4@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_24" },
    { "id": 25, "name": "Chemistry Student 5", "email": "student.chemistry5@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_25" },
    { "id": 26, "name": "Chemistry Student 6", "email": "student.chemistry6@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_26" },
    { "id": 27, "name": "Chemistry Student 7", "email": "student.chemistry7@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_27" },
    { "id": 28, "name": "Chemistry Student 8", "email": "student.chemistry8@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_28" },
    { "id": 29, "name": "Chemistry Student 9", "email": "student.chemistry9@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_29" },
    { "id": 30, "name": "Chemistry Student 10", "email": "student.chemistry10@example.com", "departmentId": 22, "advisorId": 3, "password": "password_student_30" },
    { "id": 31, "name": "Math Student 1", "email": "student.math1@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_31" },
    { "id": 32, "name": "Math Student 2", "email": "student.math2@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_32" },
    { "id": 33, "name": "Math Student 3", "email": "student.math3@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_33" },
    { "id": 34, "name": "Math Student 4", "email": "student.math4@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_34" },
    { "id": 35, "name": "Math Student 5", "email": "student.math5@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_35" },
    { "id": 36, "name": "Math Student 6", "email": "student.math6@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_36" },
    { "id": 37, "name": "Math Student 7", "email": "student.math7@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_37" },
    { "id": 38, "name": "Math Student 8", "email": "student.math8@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_38" },
    { "id": 39, "name": "Math Student 9", "email": "student.math9@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_39" },
    { "id": 40, "name": "Math Student 10", "email": "student.math10@example.com", "departmentId": 23, "advisorId": 4, "password": "password_student_40" },
    { "id": 41, "name": "MolBioGen Student 1", "email": "student.molbiogen1@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_41" },
    { "id": 42, "name": "MolBioGen Student 2", "email": "student.molbiogen2@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_42" },
    { "id": 43, "name": "MolBioGen Student 3", "email": "student.molbiogen3@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_43" },
    { "id": 44, "name": "MolBioGen Student 4", "email": "student.molbiogen4@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_44" },
    { "id": 45, "name": "MolBioGen Student 5", "email": "student.molbiogen5@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_45" },
    { "id": 46, "name": "MolBioGen Student 6", "email": "student.molbiogen6@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_46" },
    { "id": 47, "name": "MolBioGen Student 7", "email": "student.molbiogen7@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_47" },
    { "id": 48, "name": "MolBioGen Student 8", "email": "student.molbiogen8@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_48" },
    { "id": 49, "name": "MolBioGen Student 9", "email": "student.molbiogen9@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_49" },
    { "id": 50, "name": "MolBioGen Student 10", "email": "student.molbiogen10@example.com", "departmentId": 24, "advisorId": 5, "password": "password_student_50" },
    { "id": 51, "name": "CompEng Student 1", "email": "student.compeng1@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_51" },
    { "id": 52, "name": "CompEng Student 2", "email": "student.compeng2@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_52" },
    { "id": 53, "name": "CompEng Student 3", "email": "student.compeng3@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_53" },
    { "id": 54, "name": "CompEng Student 4", "email": "student.compeng4@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_54" },
    { "id": 55, "name": "CompEng Student 5", "email": "student.compeng5@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_55" },
    { "id": 56, "name": "CompEng Student 6", "email": "student.compeng6@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_56" },
    { "id": 57, "name": "CompEng Student 7", "email": "student.compeng7@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_57" },
    { "id": 58, "name": "CompEng Student 8", "email": "student.compeng8@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_58" },
    { "id": 59, "name": "CompEng Student 9", "email": "student.compeng9@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_59" },
    { "id": 60, "name": "CompEng Student 10", "email": "student.compeng10@example.com", "departmentId": 25, "advisorId": 6, "password": "password_student_60" },
    { "id": 61, "name": "BioEng Student 1", "email": "student.bioeng1@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_61" },
    { "id": 62, "name": "BioEng Student 2", "email": "student.bioeng2@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_62" },
    { "id": 63, "name": "BioEng Student 3", "email": "student.bioeng3@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_63" },
    { "id": 64, "name": "BioEng Student 4", "email": "student.bioeng4@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_64" },
    { "id": 65, "name": "BioEng Student 5", "email": "student.bioeng5@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_65" },
    { "id": 66, "name": "BioEng Student 6", "email": "student.bioeng6@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_66" },
    { "id": 67, "name": "BioEng Student 7", "email": "student.bioeng7@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_67" },
    { "id": 68, "name": "BioEng Student 8", "email": "student.bioeng8@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_68" },
    { "id": 69, "name": "BioEng Student 9", "email": "student.bioeng9@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_69" },
    { "id": 70, "name": "BioEng Student 10", "email": "student.bioeng10@example.com", "departmentId": 26, "advisorId": 7, "password": "password_student_70" },
    { "id": 71, "name": "EnvEng Student 1", "email": "student.enveng1@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_71" },
    { "id": 72, "name": "EnvEng Student 2", "email": "student.enveng2@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_72" },
    { "id": 73, "name": "EnvEng Student 3", "email": "student.enveng3@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_73" },
    { "id": 74, "name": "EnvEng Student 4", "email": "student.enveng4@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_74" },
    { "id": 75, "name": "EnvEng Student 5", "email": "student.enveng5@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_75" },
    { "id": 76, "name": "EnvEng Student 6", "email": "student.enveng6@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_76" },
    { "id": 77, "name": "EnvEng Student 7", "email": "student.enveng7@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_77" },
    { "id": 78, "name": "EnvEng Student 8", "email": "student.enveng8@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_78" },
    { "id": 79, "name": "EnvEng Student 9", "email": "student.enveng9@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_79" },
    { "id": 80, "name": "EnvEng Student 10", "email": "student.enveng10@example.com", "departmentId": 27, "advisorId": 8, "password": "password_student_80" },
    { "id": 81, "name": "EnergySysEng Student 1", "email": "student.energysyseng1@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_81" },
    { "id": 82, "name": "EnergySysEng Student 2", "email": "student.energysyseng2@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_82" },
    { "id": 83, "name": "EnergySysEng Student 3", "email": "student.energysyseng3@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_83" },
    { "id": 84, "name": "EnergySysEng Student 4", "email": "student.energysyseng4@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_84" },
    { "id": 85, "name": "EnergySysEng Student 5", "email": "student.energysyseng5@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_85" },
    { "id": 86, "name": "EnergySysEng Student 6", "email": "student.energysyseng6@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_86" },
    { "id": 87, "name": "EnergySysEng Student 7", "email": "student.energysyseng7@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_87" },
    { "id": 88, "name": "EnergySysEng Student 8", "email": "student.energysyseng8@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_88" },
    { "id": 89, "name": "EnergySysEng Student 9", "email": "student.energysyseng9@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_89" },
    { "id": 90, "name": "EnergySysEng Student 10", "email": "student.energysyseng10@example.com", "departmentId": 28, "advisorId": 9, "password": "password_student_90" },
    { "id": 91, "name": "EEE Student 1", "email": "student.eee1@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_91" },
    { "id": 92, "name": "EEE Student 2", "email": "student.eee2@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_92" },
    { "id": 93, "name": "EEE Student 3", "email": "student.eee3@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_93" },
    { "id": 94, "name": "EEE Student 4", "email": "student.eee4@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_94" },
    { "id": 95, "name": "EEE Student 5", "email": "student.eee5@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_95" },
    { "id": 96, "name": "EEE Student 6", "email": "student.eee6@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_96" },
    { "id": 97, "name": "EEE Student 7", "email": "student.eee7@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_97" },
    { "id": 98, "name": "EEE Student 8", "email": "student.eee8@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_98" },
    { "id": 99, "name": "EEE Student 9", "email": "student.eee9@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_99" },
    { "id": 100, "name": "EEE Student 10", "email": "student.eee10@example.com", "departmentId": 29, "advisorId": 10, "password": "password_student_100" },
    { "id": 101, "name": "FoodEng Student 1", "email": "student.foodeng1@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_101" },
    { "id": 102, "name": "FoodEng Student 2", "email": "student.foodeng2@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_102" },
    { "id": 103, "name": "FoodEng Student 3", "email": "student.foodeng3@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_103" },
    { "id": 104, "name": "FoodEng Student 4", "email": "student.foodeng4@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_104" },
    { "id": 105, "name": "FoodEng Student 5", "email": "student.foodeng5@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_105" },
    { "id": 106, "name": "FoodEng Student 6", "email": "student.foodeng6@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_106" },
    { "id": 107, "name": "FoodEng Student 7", "email": "student.foodeng7@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_107" },
    { "id": 108, "name": "FoodEng Student 8", "email": "student.foodeng8@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_108" },
    { "id": 109, "name": "FoodEng Student 9", "email": "student.foodeng9@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_109" },
    { "id": 110, "name": "FoodEng Student 10", "email": "student.foodeng10@example.com", "departmentId": 30, "advisorId": 11, "password": "password_student_110" },
    { "id": 111, "name": "CivilEng Student 1", "email": "student.civileng1@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_111" },
    { "id": 112, "name": "CivilEng Student 2", "email": "student.civileng2@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_112" },
    { "id": 113, "name": "CivilEng Student 3", "email": "student.civileng3@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_113" },
    { "id": 114, "name": "CivilEng Student 4", "email": "student.civileng4@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_114" },
    { "id": 115, "name": "CivilEng Student 5", "email": "student.civileng5@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_115" },
    { "id": 116, "name": "CivilEng Student 6", "email": "student.civileng6@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_116" },
    { "id": 117, "name": "CivilEng Student 7", "email": "student.civileng7@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_117" },
    { "id": 118, "name": "CivilEng Student 8", "email": "student.civileng8@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_118" },
    { "id": 119, "name": "CivilEng Student 9", "email": "student.civileng9@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_119" },
    { "id": 120, "name": "CivilEng Student 10", "email": "student.civileng10@example.com", "departmentId": 31, "advisorId": 12, "password": "password_student_120" },
    { "id": 121, "name": "ChemEng Student 1", "email": "student.chemeng1@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_121" },
    { "id": 122, "name": "ChemEng Student 2", "email": "student.chemeng2@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_122" },
    { "id": 123, "name": "ChemEng Student 3", "email": "student.chemeng3@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_123" },
    { "id": 124, "name": "ChemEng Student 4", "email": "student.chemeng4@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_124" },
    { "id": 125, "name": "ChemEng Student 5", "email": "student.chemeng5@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_125" },
    { "id": 126, "name": "ChemEng Student 6", "email": "student.chemeng6@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_126" },
    { "id": 127, "name": "ChemEng Student 7", "email": "student.chemeng7@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_127" },
    { "id": 128, "name": "ChemEng Student 8", "email": "student.chemeng8@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_128" },
    { "id": 129, "name": "ChemEng Student 9", "email": "student.chemeng9@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_129" },
    { "id": 130, "name": "ChemEng Student 10", "email": "student.chemeng10@example.com", "departmentId": 32, "advisorId": 13, "password": "password_student_130" },
    { "id": 131, "name": "MechEng Student 1", "email": "student.mecheng1@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_131" },
    { "id": 132, "name": "MechEng Student 2", "email": "student.mecheng2@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_132" },
    { "id": 133, "name": "MechEng Student 3", "email": "student.mecheng3@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_133" },
    { "id": 134, "name": "MechEng Student 4", "email": "student.mecheng4@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_134" },
    { "id": 135, "name": "MechEng Student 5", "email": "student.mecheng5@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_135" },
    { "id": 136, "name": "MechEng Student 6", "email": "student.mecheng6@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_136" },
    { "id": 137, "name": "MechEng Student 7", "email": "student.mecheng7@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_137" },
    { "id": 138, "name": "MechEng Student 8", "email": "student.mecheng8@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_138" },
    { "id": 139, "name": "MechEng Student 9", "email": "student.mecheng9@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_139" },
    { "id": 140, "name": "MechEng Student 10", "email": "student.mecheng10@example.com", "departmentId": 33, "advisorId": 14, "password": "password_student_140" },
    { "id": 141, "name": "MatSciEng Student 1", "email": "student.matscieng1@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_141" },
    { "id": 142, "name": "MatSciEng Student 2", "email": "student.matscieng2@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_142" },
    { "id": 143, "name": "MatSciEng Student 3", "email": "student.matscieng3@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_143" },
    { "id": 144, "name": "MatSciEng Student 4", "email": "student.matscieng4@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_144" },
    { "id": 145, "name": "MatSciEng Student 5", "email": "student.matscieng5@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_145" },
    { "id": 146, "name": "MatSciEng Student 6", "email": "student.matscieng6@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_146" },
    { "id": 147, "name": "MatSciEng Student 7", "email": "student.matscieng7@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_147" },
    { "id": 148, "name": "MatSciEng Student 8", "email": "student.matscieng8@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_148" },
    { "id": 149, "name": "MatSciEng Student 9", "email": "student.matscieng9@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_149" },
    { "id": 150, "name": "MatSciEng Student 10", "email": "student.matscieng10@example.com", "departmentId": 34, "advisorId": 15, "password": "password_student_150" },
    { "id": 151, "name": "IndDesign Student 1", "email": "student.inddesign1@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_151" },
    { "id": 152, "name": "IndDesign Student 2", "email": "student.inddesign2@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_152" },
    { "id": 153, "name": "IndDesign Student 3", "email": "student.inddesign3@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_153" },
    { "id": 154, "name": "IndDesign Student 4", "email": "student.inddesign4@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_154" },
    { "id": 155, "name": "IndDesign Student 5", "email": "student.inddesign5@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_155" },
    { "id": 156, "name": "IndDesign Student 6", "email": "student.inddesign6@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_156" },
    { "id": 157, "name": "IndDesign Student 7", "email": "student.inddesign7@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_157" },
    { "id": 158, "name": "IndDesign Student 8", "email": "student.inddesign8@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_158" },
    { "id": 159, "name": "IndDesign Student 9", "email": "student.inddesign9@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_159" },
    { "id": 160, "name": "IndDesign Student 10", "email": "student.inddesign10@example.com", "departmentId": 35, "advisorId": 16, "password": "password_student_160" },
    { "id": 161, "name": "Arch Student 1", "email": "student.arch1@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_161" },
    { "id": 162, "name": "Arch Student 2", "email": "student.arch2@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_162" },
    { "id": 163, "name": "Arch Student 3", "email": "student.arch3@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_163" },
    { "id": 164, "name": "Arch Student 4", "email": "student.arch4@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_164" },
    { "id": 165, "name": "Arch Student 5", "email": "student.arch5@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_165" },
    { "id": 166, "name": "Arch Student 6", "email": "student.arch6@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_166" },
    { "id": 167, "name": "Arch Student 7", "email": "student.arch7@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_167" },
    { "id": 168, "name": "Arch Student 8", "email": "student.arch8@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_168" },
    { "id": 169, "name": "Arch Student 9", "email": "student.arch9@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_169" },
    { "id": 170, "name": "Arch Student 10", "email": "student.arch10@example.com", "departmentId": 37, "advisorId": 17, "password": "password_student_170" },
    { "id": 171, "name": "CityPlan Student 1", "email": "student.cityplan1@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_171" },
    { "id": 172, "name": "CityPlan Student 2", "email": "student.cityplan2@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_172" },
    { "id": 173, "name": "CityPlan Student 3", "email": "student.cityplan3@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_173" },
    { "id": 174, "name": "CityPlan Student 4", "email": "student.cityplan4@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_174" },
    { "id": 175, "name": "CityPlan Student 5", "email": "student.cityplan5@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_175" },
    { "id": 176, "name": "CityPlan Student 6", "email": "student.cityplan6@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_176" },
    { "id": 177, "name": "CityPlan Student 7", "email": "student.cityplan7@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_177" },
    { "id": 178, "name": "CityPlan Student 8", "email": "student.cityplan8@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_178" },
    { "id": 179, "name": "CityPlan Student 9", "email": "student.cityplan9@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_179" },
    { "id": 180, "name": "CityPlan Student 10", "email": "student.cityplan10@example.com", "departmentId": 38, "advisorId": 18, "password": "password_student_180" }
  ],
  transcripts: [
    { "id": 1, "creditsCompleted": 210, "compulsoryCoursesCompleted": 45, "ects": 210.5, "studentId": 1 },
    { "id": 2, "creditsCompleted": 225, "compulsoryCoursesCompleted": 48, "ects": 225.0, "studentId": 2 },
    { "id": 3, "creditsCompleted": 205, "compulsoryCoursesCompleted": 42, "ects": 205.0, "studentId": 3 },
    { "id": 4, "creditsCompleted": 230, "compulsoryCoursesCompleted": 50, "ects": 230.5, "studentId": 4 },
    { "id": 5, "creditsCompleted": 218, "compulsoryCoursesCompleted": 46, "ects": 218.0, "studentId": 5 },
    { "id": 6, "creditsCompleted": 200, "compulsoryCoursesCompleted": 40, "ects": 200.0, "studentId": 6 },
    { "id": 7, "creditsCompleted": 235, "compulsoryCoursesCompleted": 50, "ects": 235.5, "studentId": 7 },
    { "id": 8, "creditsCompleted": 212, "compulsoryCoursesCompleted": 44, "ects": 212.0, "studentId": 8 },
    { "id": 9, "creditsCompleted": 222, "compulsoryCoursesCompleted": 47, "ects": 222.5, "studentId": 9 },
    { "id": 10, "creditsCompleted": 208, "compulsoryCoursesCompleted": 43, "ects": 208.0, "studentId": 10 },
    { "id": 11, "creditsCompleted": 211, "compulsoryCoursesCompleted": 45, "ects": 211.5, "studentId": 11 },
    { "id": 12, "creditsCompleted": 226, "compulsoryCoursesCompleted": 48, "ects": 226.0, "studentId": 12 },
    { "id": 13, "creditsCompleted": 206, "compulsoryCoursesCompleted": 42, "ects": 206.0, "studentId": 13 },
    { "id": 14, "creditsCompleted": 231, "compulsoryCoursesCompleted": 50, "ects": 231.5, "studentId": 14 },
    { "id": 15, "creditsCompleted": 219, "compulsoryCoursesCompleted": 46, "ects": 219.0, "studentId": 15 },
    { "id": 16, "creditsCompleted": 201, "compulsoryCoursesCompleted": 40, "ects": 201.0, "studentId": 16 },
    { "id": 17, "creditsCompleted": 236, "compulsoryCoursesCompleted": 50, "ects": 236.5, "studentId": 17 },
    { "id": 18, "creditsCompleted": 213, "compulsoryCoursesCompleted": 44, "ects": 213.0, "studentId": 18 },
    { "id": 19, "creditsCompleted": 223, "compulsoryCoursesCompleted": 47, "ects": 223.5, "studentId": 19 },
    { "id": 20, "creditsCompleted": 209, "compulsoryCoursesCompleted": 43, "ects": 209.0, "studentId": 20 },
    { "id": 21, "creditsCompleted": 215, "compulsoryCoursesCompleted": 46, "ects": 215.5, "studentId": 21 },
    { "id": 22, "creditsCompleted": 228, "compulsoryCoursesCompleted": 49, "ects": 228.0, "studentId": 22 },
    { "id": 23, "creditsCompleted": 203, "compulsoryCoursesCompleted": 41, "ects": 203.0, "studentId": 23 },
    { "id": 24, "creditsCompleted": 232, "compulsoryCoursesCompleted": 50, "ects": 232.5, "studentId": 24 },
    { "id": 25, "creditsCompleted": 216, "compulsoryCoursesCompleted": 45, "ects": 216.0, "studentId": 25 },
    { "id": 26, "creditsCompleted": 204, "compulsoryCoursesCompleted": 41, "ects": 204.0, "studentId": 26 },
    { "id": 27, "creditsCompleted": 237, "compulsoryCoursesCompleted": 50, "ects": 237.5, "studentId": 27 },
    { "id": 28, "creditsCompleted": 214, "compulsoryCoursesCompleted": 44, "ects": 214.0, "studentId": 28 },
    { "id": 29, "creditsCompleted": 221, "compulsoryCoursesCompleted": 47, "ects": 221.5, "studentId": 29 },
    { "id": 30, "creditsCompleted": 207, "compulsoryCoursesCompleted": 42, "ects": 207.0, "studentId": 30 },
    { "id": 31, "creditsCompleted": 210, "compulsoryCoursesCompleted": 45, "ects": 210.5, "studentId": 31 },
    { "id": 32, "creditsCompleted": 225, "compulsoryCoursesCompleted": 48, "ects": 225.0, "studentId": 32 },
    { "id": 33, "creditsCompleted": 205, "compulsoryCoursesCompleted": 42, "ects": 205.0, "studentId": 33 },
    { "id": 34, "creditsCompleted": 230, "compulsoryCoursesCompleted": 50, "ects": 230.5, "studentId": 34 },
    { "id": 35, "creditsCompleted": 218, "compulsoryCoursesCompleted": 46, "ects": 218.0, "studentId": 35 },
    { "id": 36, "creditsCompleted": 200, "compulsoryCoursesCompleted": 40, "ects": 200.0, "studentId": 36 },
    { "id": 37, "creditsCompleted": 235, "compulsoryCoursesCompleted": 50, "ects": 235.5, "studentId": 37 },
    { "id": 38, "creditsCompleted": 212, "compulsoryCoursesCompleted": 44, "ects": 212.0, "studentId": 38 },
    { "id": 39, "creditsCompleted": 222, "compulsoryCoursesCompleted": 47, "ects": 222.5, "studentId": 39 },
    { "id": 40, "creditsCompleted": 208, "compulsoryCoursesCompleted": 43, "ects": 208.0, "studentId": 40 },
    { "id": 41, "creditsCompleted": 211, "compulsoryCoursesCompleted": 45, "ects": 211.5, "studentId": 41 },
    { "id": 42, "creditsCompleted": 226, "compulsoryCoursesCompleted": 48, "ects": 226.0, "studentId": 42 },
    { "id": 43, "creditsCompleted": 206, "compulsoryCoursesCompleted": 42, "ects": 206.0, "studentId": 43 },
    { "id": 44, "creditsCompleted": 231, "compulsoryCoursesCompleted": 50, "ects": 231.5, "studentId": 44 },
    { "id": 45, "creditsCompleted": 219, "compulsoryCoursesCompleted": 46, "ects": 219.0, "studentId": 45 },
    { "id": 46, "creditsCompleted": 201, "compulsoryCoursesCompleted": 40, "ects": 201.0, "studentId": 46 },
    { "id": 47, "creditsCompleted": 236, "compulsoryCoursesCompleted": 50, "ects": 236.5, "studentId": 47 },
    { "id": 48, "creditsCompleted": 213, "compulsoryCoursesCompleted": 44, "ects": 213.0, "studentId": 48 },
    { "id": 49, "creditsCompleted": 223, "compulsoryCoursesCompleted": 47, "ects": 223.5, "studentId": 49 },
    { "id": 50, "creditsCompleted": 209, "compulsoryCoursesCompleted": 43, "ects": 209.0, "studentId": 50 },
    { "id": 51, "creditsCompleted": 215, "compulsoryCoursesCompleted": 46, "ects": 215.5, "studentId": 51 },
    { "id": 52, "creditsCompleted": 228, "compulsoryCoursesCompleted": 49, "ects": 228.0, "studentId": 52 },
    { "id": 53, "creditsCompleted": 203, "compulsoryCoursesCompleted": 41, "ects": 203.0, "studentId": 53 },
    { "id": 54, "creditsCompleted": 232, "compulsoryCoursesCompleted": 50, "ects": 232.5, "studentId": 54 },
    { "id": 55, "creditsCompleted": 216, "compulsoryCoursesCompleted": 45, "ects": 216.0, "studentId": 55 },
    { "id": 56, "creditsCompleted": 204, "compulsoryCoursesCompleted": 41, "ects": 204.0, "studentId": 56 },
    { "id": 57, "creditsCompleted": 237, "compulsoryCoursesCompleted": 50, "ects": 237.5, "studentId": 57 },
    { "id": 58, "creditsCompleted": 214, "compulsoryCoursesCompleted": 44, "ects": 214.0, "studentId": 58 },
    { "id": 59, "creditsCompleted": 221, "compulsoryCoursesCompleted": 47, "ects": 221.5, "studentId": 59 },
    { "id": 60, "creditsCompleted": 207, "compulsoryCoursesCompleted": 42, "ects": 207.0, "studentId": 60 },
    { "id": 61, "creditsCompleted": 210, "compulsoryCoursesCompleted": 45, "ects": 210.5, "studentId": 61 },
    { "id": 62, "creditsCompleted": 225, "compulsoryCoursesCompleted": 48, "ects": 225.0, "studentId": 62 },
    { "id": 63, "creditsCompleted": 205, "compulsoryCoursesCompleted": 42, "ects": 205.0, "studentId": 63 },
    { "id": 64, "creditsCompleted": 230, "compulsoryCoursesCompleted": 50, "ects": 230.5, "studentId": 64 },
    { "id": 65, "creditsCompleted": 218, "compulsoryCoursesCompleted": 46, "ects": 218.0, "studentId": 65 },
    { "id": 66, "creditsCompleted": 200, "compulsoryCoursesCompleted": 40, "ects": 200.0, "studentId": 66 },
    { "id": 67, "creditsCompleted": 235, "compulsoryCoursesCompleted": 50, "ects": 235.5, "studentId": 67 },
    { "id": 68, "creditsCompleted": 212, "compulsoryCoursesCompleted": 44, "ects": 212.0, "studentId": 68 },
    { "id": 69, "creditsCompleted": 222, "compulsoryCoursesCompleted": 47, "ects": 222.5, "studentId": 69 },
    { "id": 70, "creditsCompleted": 208, "compulsoryCoursesCompleted": 43, "ects": 208.0, "studentId": 70 },
    { "id": 71, "creditsCompleted": 211, "compulsoryCoursesCompleted": 45, "ects": 211.5, "studentId": 71 },
    { "id": 72, "creditsCompleted": 226, "compulsoryCoursesCompleted": 48, "ects": 226.0, "studentId": 72 },
    { "id": 73, "creditsCompleted": 206, "compulsoryCoursesCompleted": 42, "ects": 206.0, "studentId": 73 },
    { "id": 74, "creditsCompleted": 231, "compulsoryCoursesCompleted": 50, "ects": 231.5, "studentId": 74 },
    { "id": 75, "creditsCompleted": 219, "compulsoryCoursesCompleted": 46, "ects": 219.0, "studentId": 75 },
    { "id": 76, "creditsCompleted": 201, "compulsoryCoursesCompleted": 40, "ects": 201.0, "studentId": 76 },
    { "id": 77, "creditsCompleted": 236, "compulsoryCoursesCompleted": 50, "ects": 236.5, "studentId": 77 },
    { "id": 78, "creditsCompleted": 213, "compulsoryCoursesCompleted": 44, "ects": 213.0, "studentId": 78 },
    { "id": 79, "creditsCompleted": 223, "compulsoryCoursesCompleted": 47, "ects": 223.5, "studentId": 79 },
    { "id": 80, "creditsCompleted": 209, "compulsoryCoursesCompleted": 43, "ects": 209.0, "studentId": 80 },
    { "id": 81, "creditsCompleted": 215, "compulsoryCoursesCompleted": 46, "ects": 215.5, "studentId": 81 },
    { "id": 82, "creditsCompleted": 228, "compulsoryCoursesCompleted": 49, "ects": 228.0, "studentId": 82 },
    { "id": 83, "creditsCompleted": 203, "compulsoryCoursesCompleted": 41, "ects": 203.0, "studentId": 83 },
    { "id": 84, "creditsCompleted": 232, "compulsoryCoursesCompleted": 50, "ects": 232.5, "studentId": 84 },
    { "id": 85, "creditsCompleted": 216, "compulsoryCoursesCompleted": 45, "ects": 216.0, "studentId": 85 },
    { "id": 86, "creditsCompleted": 204, "compulsoryCoursesCompleted": 41, "ects": 204.0, "studentId": 86 },
    { "id": 87, "creditsCompleted": 237, "compulsoryCoursesCompleted": 50, "ects": 237.5, "studentId": 87 },
    { "id": 88, "creditsCompleted": 214, "compulsoryCoursesCompleted": 44, "ects": 214.0, "studentId": 88 },
    { "id": 89, "creditsCompleted": 221, "compulsoryCoursesCompleted": 47, "ects": 221.5, "studentId": 89 },
    { "id": 90, "creditsCompleted": 207, "compulsoryCoursesCompleted": 42, "ects": 207.0, "studentId": 90 },
    { "id": 91, "creditsCompleted": 210, "compulsoryCoursesCompleted": 45, "ects": 210.5, "studentId": 91 },
    { "id": 92, "creditsCompleted": 225, "compulsoryCoursesCompleted": 48, "ects": 225.0, "studentId": 92 },
    { "id": 93, "creditsCompleted": 205, "compulsoryCoursesCompleted": 42, "ects": 205.0, "studentId": 93 },
    { "id": 94, "creditsCompleted": 230, "compulsoryCoursesCompleted": 50, "ects": 230.5, "studentId": 94 },
    { "id": 95, "creditsCompleted": 218, "compulsoryCoursesCompleted": 46, "ects": 218.0, "studentId": 95 },
    { "id": 96, "creditsCompleted": 200, "compulsoryCoursesCompleted": 40, "ects": 200.0, "studentId": 96 },
    { "id": 97, "creditsCompleted": 235, "compulsoryCoursesCompleted": 50, "ects": 235.5, "studentId": 97 },
    { "id": 98, "creditsCompleted": 212, "compulsoryCoursesCompleted": 44, "ects": 212.0, "studentId": 98 },
    { "id": 99, "creditsCompleted": 222, "compulsoryCoursesCompleted": 47, "ects": 222.5, "studentId": 99 },
    { "id": 100, "creditsCompleted": 208, "compulsoryCoursesCompleted": 43, "ects": 208.0, "studentId": 100 },
    { "id": 101, "creditsCompleted": 211, "compulsoryCoursesCompleted": 45, "ects": 211.5, "studentId": 101 },
    { "id": 102, "creditsCompleted": 226, "compulsoryCoursesCompleted": 48, "ects": 226.0, "studentId": 102 },
    { "id": 103, "creditsCompleted": 206, "compulsoryCoursesCompleted": 42, "ects": 206.0, "studentId": 103 },
    { "id": 104, "creditsCompleted": 231, "compulsoryCoursesCompleted": 50, "ects": 231.5, "studentId": 104 },
    { "id": 105, "creditsCompleted": 219, "compulsoryCoursesCompleted": 46, "ects": 219.0, "studentId": 105 },
    { "id": 106, "creditsCompleted": 201, "compulsoryCoursesCompleted": 40, "ects": 201.0, "studentId": 106 },
    { "id": 107, "creditsCompleted": 236, "compulsoryCoursesCompleted": 50, "ects": 236.5, "studentId": 107 },
    { "id": 108, "creditsCompleted": 213, "compulsoryCoursesCompleted": 44, "ects": 213.0, "studentId": 108 },
    { "id": 109, "creditsCompleted": 223, "compulsoryCoursesCompleted": 47, "ects": 223.5, "studentId": 109 },
    { "id": 110, "creditsCompleted": 209, "compulsoryCoursesCompleted": 43, "ects": 209.0, "studentId": 110 },
    { "id": 111, "creditsCompleted": 215, "compulsoryCoursesCompleted": 46, "ects": 215.5, "studentId": 111 },
    { "id": 112, "creditsCompleted": 228, "compulsoryCoursesCompleted": 49, "ects": 228.0, "studentId": 112 },
    { "id": 113, "creditsCompleted": 203, "compulsoryCoursesCompleted": 41, "ects": 203.0, "studentId": 113 },
    { "id": 114, "creditsCompleted": 232, "compulsoryCoursesCompleted": 50, "ects": 232.5, "studentId": 114 },
    { "id": 115, "creditsCompleted": 216, "compulsoryCoursesCompleted": 45, "ects": 216.0, "studentId": 115 },
    { "id": 116, "creditsCompleted": 204, "compulsoryCoursesCompleted": 41, "ects": 204.0, "studentId": 116 },
    { "id": 117, "creditsCompleted": 237, "compulsoryCoursesCompleted": 50, "ects": 237.5, "studentId": 117 },
    { "id": 118, "creditsCompleted": 214, "compulsoryCoursesCompleted": 44, "ects": 214.0, "studentId": 118 },
    { "id": 119, "creditsCompleted": 221, "compulsoryCoursesCompleted": 47, "ects": 221.5, "studentId": 119 },
    { "id": 120, "creditsCompleted": 207, "compulsoryCoursesCompleted": 42, "ects": 207.0, "studentId": 120 },
    { "id": 121, "creditsCompleted": 210, "compulsoryCoursesCompleted": 45, "ects": 210.5, "studentId": 121 },
    { "id": 122, "creditsCompleted": 225, "compulsoryCoursesCompleted": 48, "ects": 225.0, "studentId": 122 },
    { "id": 123, "creditsCompleted": 205, "compulsoryCoursesCompleted": 42, "ects": 205.0, "studentId": 123 },
    { "id": 124, "creditsCompleted": 230, "compulsoryCoursesCompleted": 50, "ects": 230.5, "studentId": 124 },
    { "id": 125, "creditsCompleted": 218, "compulsoryCoursesCompleted": 46, "ects": 218.0, "studentId": 125 },
    { "id": 126, "creditsCompleted": 200, "compulsoryCoursesCompleted": 40, "ects": 200.0, "studentId": 126 },
    { "id": 127, "creditsCompleted": 235, "compulsoryCoursesCompleted": 50, "ects": 235.5, "studentId": 127 },
    { "id": 128, "creditsCompleted": 212, "compulsoryCoursesCompleted": 44, "ects": 212.0, "studentId": 128 },
    { "id": 129, "creditsCompleted": 222, "compulsoryCoursesCompleted": 47, "ects": 222.5, "studentId": 129 },
    { "id": 130, "creditsCompleted": 208, "compulsoryCoursesCompleted": 43, "ects": 208.0, "studentId": 130 },
    { "id": 131, "creditsCompleted": 211, "compulsoryCoursesCompleted": 45, "ects": 211.5, "studentId": 131 },
    { "id": 132, "creditsCompleted": 226, "compulsoryCoursesCompleted": 48, "ects": 226.0, "studentId": 132 },
    { "id": 133, "creditsCompleted": 206, "compulsoryCoursesCompleted": 42, "ects": 206.0, "studentId": 133 },
    { "id": 134, "creditsCompleted": 231, "compulsoryCoursesCompleted": 50, "ects": 231.5, "studentId": 134 },
    { "id": 135, "creditsCompleted": 219, "compulsoryCoursesCompleted": 46, "ects": 219.0, "studentId": 135 },
    { "id": 136, "creditsCompleted": 201, "compulsoryCoursesCompleted": 40, "ects": 201.0, "studentId": 136 },
    { "id": 137, "creditsCompleted": 236, "compulsoryCoursesCompleted": 50, "ects": 236.5, "studentId": 137 },
    { "id": 138, "creditsCompleted": 213, "compulsoryCoursesCompleted": 44, "ects": 213.0, "studentId": 138 },
    { "id": 139, "creditsCompleted": 223, "compulsoryCoursesCompleted": 47, "ects": 223.5, "studentId": 139 },
    { "id": 140, "creditsCompleted": 209, "compulsoryCoursesCompleted": 43, "ects": 209.0, "studentId": 140 },
    { "id": 141, "creditsCompleted": 215, "compulsoryCoursesCompleted": 46, "ects": 215.5, "studentId": 141 },
    { "id": 142, "creditsCompleted": 228, "compulsoryCoursesCompleted": 49, "ects": 228.0, "studentId": 142 },
    { "id": 143, "creditsCompleted": 203, "compulsoryCoursesCompleted": 41, "ects": 203.0, "studentId": 143 },
    { "id": 144, "creditsCompleted": 232, "compulsoryCoursesCompleted": 50, "ects": 232.5, "studentId": 144 },
    { "id": 145, "creditsCompleted": 216, "compulsoryCoursesCompleted": 45, "ects": 216.0, "studentId": 145 },
    { "id": 146, "creditsCompleted": 204, "compulsoryCoursesCompleted": 41, "ects": 204.0, "studentId": 146 },
    { "id": 147, "creditsCompleted": 237, "compulsoryCoursesCompleted": 50, "ects": 237.5, "studentId": 147 },
    { "id": 148, "creditsCompleted": 214, "compulsoryCoursesCompleted": 44, "ects": 214.0, "studentId": 148 },
    { "id": 149, "creditsCompleted": 221, "compulsoryCoursesCompleted": 47, "ects": 221.5, "studentId": 149 },
    { "id": 150, "creditsCompleted": 207, "compulsoryCoursesCompleted": 42, "ects": 207.0, "studentId": 150 },
    { "id": 151, "creditsCompleted": 210, "compulsoryCoursesCompleted": 45, "ects": 210.5, "studentId": 151 },
    { "id": 152, "creditsCompleted": 225, "compulsoryCoursesCompleted": 48, "ects": 225.0, "studentId": 152 },
    { "id": 153, "creditsCompleted": 205, "compulsoryCoursesCompleted": 42, "ects": 205.0, "studentId": 153 },
    { "id": 154, "creditsCompleted": 230, "compulsoryCoursesCompleted": 50, "ects": 230.5, "studentId": 154 },
    { "id": 155, "creditsCompleted": 218, "compulsoryCoursesCompleted": 46, "ects": 218.0, "studentId": 155 },
    { "id": 156, "creditsCompleted": 200, "compulsoryCoursesCompleted": 40, "ects": 200.0, "studentId": 156 },
    { "id": 157, "creditsCompleted": 235, "compulsoryCoursesCompleted": 50, "ects": 235.5, "studentId": 157 },
    { "id": 158, "creditsCompleted": 212, "compulsoryCoursesCompleted": 44, "ects": 212.0, "studentId": 158 },
    { "id": 159, "creditsCompleted": 222, "compulsoryCoursesCompleted": 47, "ects": 222.5, "studentId": 159 },
    { "id": 160, "creditsCompleted": 208, "compulsoryCoursesCompleted": 43, "ects": 208.0, "studentId": 160 },
    { "id": 161, "creditsCompleted": 211, "compulsoryCoursesCompleted": 45, "ects": 211.5, "studentId": 161 },
    { "id": 162, "creditsCompleted": 226, "compulsoryCoursesCompleted": 48, "ects": 226.0, "studentId": 162 },
    { "id": 163, "creditsCompleted": 206, "compulsoryCoursesCompleted": 42, "ects": 206.0, "studentId": 163 },
    { "id": 164, "creditsCompleted": 231, "compulsoryCoursesCompleted": 50, "ects": 231.5, "studentId": 164 },
    { "id": 165, "creditsCompleted": 219, "compulsoryCoursesCompleted": 46, "ects": 219.0, "studentId": 165 },
    { "id": 166, "creditsCompleted": 201, "compulsoryCoursesCompleted": 40, "ects": 201.0, "studentId": 166 },
    { "id": 167, "creditsCompleted": 236, "compulsoryCoursesCompleted": 50, "ects": 236.5, "studentId": 167 },
    { "id": 168, "creditsCompleted": 213, "compulsoryCoursesCompleted": 44, "ects": 213.0, "studentId": 168 },
    { "id": 169, "creditsCompleted": 223, "compulsoryCoursesCompleted": 47, "ects": 223.5, "studentId": 169 },
    { "id": 170, "creditsCompleted": 209, "compulsoryCoursesCompleted": 43, "ects": 209.0, "studentId": 170 },
    { "id": 171, "creditsCompleted": 215, "compulsoryCoursesCompleted": 45, "ects": 215.0, "studentId": 171 },
    { "id": 172, "creditsCompleted": 220, "compulsoryCoursesCompleted": 48, "ects": 220.5, "studentId": 172 },
    { "id": 173, "creditsCompleted": 205, "compulsoryCoursesCompleted": 41, "ects": 205.0, "studentId": 173 },
    { "id": 174, "creditsCompleted": 233, "compulsoryCoursesCompleted": 50, "ects": 233.0, "studentId": 174 },
    { "id": 175, "creditsCompleted": 217, "compulsoryCoursesCompleted": 46, "ects": 217.5, "studentId": 175 },
    { "id": 176, "creditsCompleted": 202, "compulsoryCoursesCompleted": 40, "ects": 202.5, "studentId": 176 },
    { "id": 177, "creditsCompleted": 238, "compulsoryCoursesCompleted": 50, "ects": 238.0, "studentId": 177 },
    { "id": 178, "creditsCompleted": 214, "compulsoryCoursesCompleted": 44, "ects": 214.0, "studentId": 178 },
    { "id": 179, "creditsCompleted": 224, "compulsoryCoursesCompleted": 47, "ects": 224.5, "studentId": 179 },
    { "id": 180, "creditsCompleted": 210, "compulsoryCoursesCompleted": 43, "ects": 210.0, "studentId": 180 }
  ]
};
// --- End Mock Data ---

// Define types for better type safety
type Advisor = typeof mockData.advisors[number];
type Student = typeof mockData.students[number];
type Transcript = typeof mockData.transcripts[number];
type User = Advisor | Student;

type TranscriptResponse = Omit<Transcript, 'id' | 'studentId'>;

interface UserDataResponse {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  advisorId?: number; // Optional for advisors
  type?: string; // Optional for students
  transcript?: TranscriptResponse;
  students?: Array<Omit<Student, 'password'> & { transcript?: TranscriptResponse }>;
}

interface SuccessResponse {
  success: true;
  userType: 'student' | 'advisor';
  isFirstLogin: boolean;
  userData: UserDataResponse;
}

interface ErrorResponse {
  success: false;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Mock Auth Attempt:', { email });

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user: User | undefined = undefined;
    let userType: 'student' | 'advisor' | null = null;
    let userDataToSend: UserDataResponse = {} as UserDataResponse;

    // Check students first
    const foundStudent = mockData.students.find(
      (s) => s.email === email && s.password === password
    );

    if (foundStudent) {
      user = foundStudent;
      userType = 'student';
      // Find all students associated with this advisor from mock data
      const associatedStudents = mockData.students
        .filter(s => s.advisorId === foundStudent.advisorId)
        .map(student => {
          const transcriptData = mockData.transcripts.find(t => t.studentId === student.id);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _studentPassword, ...studentDetails } = student;

          // Explicitly type the object to allow optional transcript
          const studentDataWithTranscript: Omit<Student, 'password'> & { transcript?: TranscriptResponse } = { ...studentDetails };

          if (transcriptData) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id: _transcriptId, studentId: _studentId, ...restOfTranscript } = transcriptData;
            studentDataWithTranscript.transcript = restOfTranscript;
          }
          return studentDataWithTranscript;
        })
        // Sort students by ID in ascending order
        .sort((a, b) => a.id - b.id);

      // ... (rest of student userDataToSend construction)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _studentPassword, ...studentDetails } = foundStudent;
      userDataToSend = {
         ...studentDetails,
         students: associatedStudents
      };
    } else {
      // Check advisors if not found in students
      const foundAdvisor = mockData.advisors.find(
        (a) => a.email === email && a.password === password
      );
      if (foundAdvisor) {
        user = foundAdvisor;
        userType = 'advisor';
        // Find all students associated with this advisor from mock data
        const associatedStudents = mockData.students
          .filter(s => s.advisorId === foundAdvisor.id)
          .map(student => {
            const transcriptData = mockData.transcripts.find(t => t.studentId === student.id);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _studentPassword, ...studentDetails } = student;

            // Explicitly type the object to allow optional transcript
            const studentDataWithTranscript: Omit<Student, 'password'> & { transcript?: TranscriptResponse } = { ...studentDetails };

            if (transcriptData) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { id: _transcriptId, studentId: _studentId, ...restOfTranscript } = transcriptData;
              studentDataWithTranscript.transcript = restOfTranscript;
            }
            return studentDataWithTranscript;
          })
          // Sort students by ID in ascending order
          .sort((a, b) => a.id - b.id);

        // ... (rest of advisor userDataToSend construction)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _advisorPassword, ...advisorDetails } = user;
        userDataToSend = {
           ...advisorDetails,
           students: associatedStudents
        };
      }
    }

    // --- Response Logic ---
    if (user && userType) {
      console.log('Mock Auth Success:', { email, type: userType });

      // Use the properly constructed userDataToSend rather than rebuilding from userDetails
      const responseData: SuccessResponse = {
        success: true,
        userType: userType,
        isFirstLogin: true,
        userData: userDataToSend,
      };

      // Add transcript only if user is a student and transcript exists
      if (userType === 'student' && userDataToSend.transcript) {
        // Instead of destructuring, create a new object without id and studentId
        responseData.userData.transcript = {
          creditsCompleted: userDataToSend.transcript.creditsCompleted,
          compulsoryCoursesCompleted: userDataToSend.transcript.compulsoryCoursesCompleted,
          ects: userDataToSend.transcript.ects
        };
      }

      return NextResponse.json(responseData);

    } else {
      console.log('Mock Auth Failed:', { email });
      const errorResponse: ErrorResponse = {
         success: false,
         message: 'Invalid credentials'
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }
  } catch (error) {
    console.error('Mock Auth Error:', error);
    const errorResponse: ErrorResponse = {
        success: false,
        message: 'Internal server error'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
} 