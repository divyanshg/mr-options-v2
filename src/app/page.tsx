"use client";

import Survey from '@/components/Survey';
import UserForm from '@/components/UserForm';
import useUser from '@/hooks/useUser';

// const responses = {
//   question_1: 1,
//   question_2: 2,
//   question_3: 1,
//   question_4: 2,
//   question_5: 1,
//   question_6: 2,
//   question_7: 1,
//   question_8: 2,
//   question_9: 1,
//   question_10: 1,
//   question_32: 2,
//   question_27: 1,
//   question_31: 1,
//   question_13: 2,
//   question_22: 1,
//   question_11: 1,
//   question_35: 2,
//   question_15: 1,
//   question_18: 1,
//   question_21: 2,
//   question_36: 1,
//   question_19: 1,
//   question_16: 2,
//   question_23: 1,
//   question_33: 1,
//   question_25: 2,
//   question_20: 1,
//   question_24: 1,
//   question_17: 2,
//   question_26: 1,
//   question_12: 1,
//   question_30: 2,
//   question_14: 2,
//   question_34: 1,
//   question_29: 1,
//   question_28: 2,
//   question_37: 2,
//   question_38: 1,
//   question_39: 2,
//   question_40: 1,
//   question_41: 2,
//   question_42: 1,
//   question_43: 1,
//   question_44: 2,
//   question_45: 1,
//   question_46: 2,
//   question_47: 1,
//   question_48: 1,
//   question_49: 2,
//   question_50: 1,
//   question_51: 2,
//   question_52: 1,
//   question_53: 1,
//   question_54: 2,
//   question_55: 1,
//   question_56: 1,
//   question_57: 1,
//   question_58: 1,
//   question_59: 1,
//   question_60: 2,
//   question_61: 1,
//   question_62: 1,
//   question_63: 2,
//   question_64: 2,
//   question_65: 2,
//   question_66: 2,
//   question_67: 2,
//   question_68: 2,
//   question_69: 1,
//   question_70: 2,
//   question_71: 2,
//   question_72: 1,
//   question_73: 1,
//   question_74: 2,
//   question_75: 2,
//   question_76: 2,
//   question_77: 2,
//   question_78: 1,
//   question_79: 1,
//   question_80: 1,
//   question_81: 2,
//   question_82: 1,
//   question_83: 2,
//   question_84: 2,
//   question_85: 2,
//   question_86: 1,
//   question_87: 2,
//   question_88: 2,
//   question_89: 2,
//   question_90: 1,
//   question_91: 1,
//   question_92: 2,
//   question_93: 2,
//   question_94: 1,
//   question_95: 2,
//   question_96: 1,
//   question_97: 2,
//   question_98: 1,
//   question_99: 1,
//   question_100: 1,
//   question_101: 1,
//   question_102: 2,
//   question_103: 2,
//   question_104: 2,
//   question_105: 1,
//   question_106: 2,
//   question_107: 2,
//   question_108: 1,
//   question_109: 1,
//   question_110: 2,
//   question_111: 2,
//   question_112: 1,
//   question_113: 2,
//   question_114: 2,
//   question_115: 2,
//   question_116: 2,
//   question_117: 1,
//   question_118: 2,
//   question_119: 2,
//   question_120: 1,
//   question_121: 1,
//   question_122: 1,
//   question_123: 1,
//   question_124: 1,
//   question_125: 1,
//   question_126: 1,
//   question_127: 2,
//   question_128: 1,
//   question_129: 2,
//   question_130: 2,
//   question_131: 1,
//   question_132: 1,
//   question_133: 1,
//   question_134: 1,
//   question_135: 2,
//   question_136: 2,
//   question_137: 2,
//   question_138: 2,
//   question_139: 2,
//   question_140: 2,
//   question_141: 1,
//   question_142: 1,
//   question_143: 2,
//   question_144: 2,
//   question_145: 1,
//   question_146: 1,
//   question_147: 2,
//   question_148: 2,
//   question_149: 1,
//   question_150: 1,
// };

export default function Home() {
  const { user } = useUser();

  return (
    <main className="lg:p-24 min-h-fit">
      {user.type !== "student" ? <UserForm type="student" /> : <Survey />}
    </main>
  );
}
