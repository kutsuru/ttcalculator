myInnerHtml("DELHTML",' <Font size=2><A Href="del.html">[delete saved data]</A></Font>',0);
//array of armor select elements
armorLoc = [document.calcForm.A_head1, document.calcForm.A_head2, document.calcForm.A_head3, document.calcForm.A_body, document.calcForm.A_left, document.calcForm.A_shoulder, document.calcForm.A_shoes, document.calcForm.A_acces1, document.calcForm.A_acces2];
//array of card select elements not including left weapon cards
cardLoc = [document.calcForm.A_weapon1_card1, document.calcForm.A_weapon1_card2, document.calcForm.A_weapon1_card3, document.calcForm.A_weapon1_card4, document.calcForm.A_head1_card, document.calcForm.A_head2_card, document.calcForm.A_left_card, document.calcForm.A_body_card, document.calcForm.A_shoulder_card, document.calcForm.A_shoes_card, document.calcForm.A_acces1_card, document.calcForm.A_acces2_card];

for(var i=1;i<=99;i++){
with(document.calcForm){
	A_BaseLV.options[i-1] = new Option(i,i);
	A_STR.options[i-1] = new Option(i,i);
	A_AGI.options[i-1] = new Option(i,i);
	A_VIT.options[i-1] = new Option(i,i);
	A_INT.options[i-1] = new Option(i,i);
	A_DEX.options[i-1] = new Option(i,i);
	A_LUK.options[i-1] = new Option(i,i);
}}

function StCalc(nSC)
{with(document.calcForm){

	n_A_STR = eval(A_STR.value);
	n_A_AGI = eval(A_AGI.value);
	n_A_VIT = eval(A_VIT.value);
	n_A_DEX = eval(A_DEX.value);
	n_A_INT = eval(A_INT.value);
	n_A_LUK = eval(A_LUK.value);

	StPoint = 0;
	for(i=2;i<=n_A_STR;i++)
		StPoint += StCalc2(i);
	for(i=2;i<=n_A_AGI;i++)
		StPoint += StCalc2(i);
	for(i=2;i<=n_A_VIT;i++)
		StPoint += StCalc2(i);
	for(i=2;i<=n_A_INT;i++)
		StPoint += StCalc2(i);
	for(i=2;i<=n_A_DEX;i++)
		StPoint += StCalc2(i);
	for(i=2;i<=n_A_LUK;i++)
		StPoint += StCalc2(i);

	n_A_BaseLV = eval(A_BaseLV.value);

	n_A_JobSet();
	if(n_Tensei)
		wStPoint = 100;
	else
		wStPoint = 48;

	if(nSC == 1 || BLVauto.checked == 0){
		for(i=1;i<n_A_BaseLV;i++)
			wStPoint += Math.floor((i) / 5) + 3;
	}
	else{
		for(i=1;StPoint > wStPoint && i<99;i++)
			wStPoint += Math.floor((i) / 5) + 3;
	}
	if(i > 99)i=99;
	A_BaseLV.value = i;
	myInnerHtml("A_STPOINT",wStPoint - StPoint,0);
}}

function StCalc2(nSC2)
{
	return Math.floor((nSC2 - 2) /10) + 2;
}

function SuperNoviceFullWeapon(nSNFW)
{
	if(nSNFW == 1){
		SuperNoviceFullWeaponCHECK = 1;
		JobASPD[20][7] = 120;
	}else{
		SuperNoviceFullWeaponCHECK = 0;
		JobASPD[20][7] = 0;
	}

	var len = document.calcForm.A_WeaponType.length;
	for(i=0;i<len;i++)
		document.calcForm.A_WeaponType.options[0] = null;
	j = 0;
	for (i=0; i<=21; i++){
		if(JobASPD[20][i] != 0){
			document.calcForm.A_WeaponType.options[j] = new Option(WeaponName[i],i);
			j++;
		}
	}

	with(document.calcForm){
		if(ItemOBJ[n_A_Equip[0]][2] != 7 && JobEquipItemSearch(ItemOBJ[n_A_Equip[0]][2])){
			var BK_BUKI = n_A_Equip[0];
			A_WeaponType.value = ItemOBJ[BK_BUKI][1];
			ClickWeaponType(ItemOBJ[BK_BUKI][1]);

			WeaponSet2();
			A_weapon1.value = BK_BUKI;
		}else{
			ClickWeaponType(0);

			WeaponSet2();
		}
		if(JobEquipItemSearch(ItemOBJ[n_A_Equip[2]][2]))
			A_head1.value = n_A_Equip[2];
		if(JobEquipItemSearch(ItemOBJ[n_A_Equip[3]][2]))
			A_head2.value = n_A_Equip[3];
		if(JobEquipItemSearch(ItemOBJ[n_A_Equip[4]][2]))
			A_head3.value = n_A_Equip[4];
		A_left.value = n_A_Equip[5];
		A_body.value = n_A_Equip[6];
		A_shoulder.value = n_A_Equip[7];
		A_shoes.value = n_A_Equip[8];
		A_acces1.value = n_A_Equip[9];
		A_acces2.value = n_A_Equip[10];
	}
}
//stat cap and rebirth job removal for baby classes - [Loa] - 2018-06-21
function BabyJobs(){
with(document.calcForm){
	//Remove rebirth classes when adopted is checked
	var adopted = eval(A_youshi.checked);
	if(adopted && A_JOB.options.length > 26){
		var jobJump = 0;
		while(A_JOB.options.length > 26){
			if(A_JOB.selectedIndex == 21){
					jobJump = 1;
			}
			A_JOB.options.remove(21);
		}
		if(jobJump == 1){
			ClickJob(0);
		}
	}
	//Add rebirth classes when adopted unchecked
	else if(!adopted && A_JOB.options.length < 46){
		for(i = 21; i < 41; i++){
			var option = document.createElement("option");
			option.value = (i);
			option.text = (JobName[i]);
			A_JOB.add(option,i);
		}
	}
	//Cap stats at 80 when adopted is checked
	if(adopted && A_STR.options.length > 79){
		for(i = A_STR.options.length - 1; i > 79; i--){
			A_STR.remove(i);
			A_STR.remove(i);
			A_AGI.remove(i);
			A_VIT.remove(i);
			A_INT.remove(i);
			A_DEX.remove(i);
			A_LUK.remove(i);
		}
	}
	//Raise stat cap to 99 if adopted is unchecked
	else if(!adopted && A_STR.options.length < 100){
		for(i = A_STR.options.length + 1; i < 100; i++){
			A_STR.options[i-1] = new Option(i,i);
			A_AGI.options[i-1] = new Option(i,i);
			A_VIT.options[i-1] = new Option(i,i);
			A_INT.options[i-1] = new Option(i,i);
			A_DEX.options[i-1] = new Option(i,i);
			A_LUK.options[i-1] = new Option(i,i);
		}
	}
}}

function StAllCalc(){
with(document.calcForm){
	BabyJobs();
	n_A_JobSet();
	VanillaWep();
	if(n_A_JOB == 20){
		if(SuperNoviceFullWeaponCHECK == 0 && eval(A_skill9.value) == 1)
			SuperNoviceFullWeapon(1);
		else if(SuperNoviceFullWeaponCHECK == 1 && eval(A_skill9.value) == 0)
			SuperNoviceFullWeapon(0);
	}
	n_A_BaseLV = eval(A_BaseLV.value);
	n_A_JobLV = eval(A_JobLV.value);

	n_A_STR = eval(A_STR.value);
	n_A_AGI = eval(A_AGI.value);
	n_A_VIT = eval(A_VIT.value);
	n_A_DEX = eval(A_DEX.value);
	n_A_INT = eval(A_INT.value);
	n_A_LUK = eval(A_LUK.value);
	SU_STR = n_A_STR;
	SU_AGI = n_A_AGI;
	SU_VIT = n_A_VIT;
	SU_DEX = n_A_DEX;
	SU_INT = n_A_INT;
	SU_LUK = n_A_LUK;

	n_A_WeaponType = eval(A_WeaponType.value);

	n_A_Arrow = eval(A_Arrow.value);

	n_A_HEAD_DEF_PLUS = ((A_HEAD_DEF_PLUS.value != "") ? eval(A_HEAD_DEF_PLUS.value) : 0); // Changed after index revamp, default value to 0 [Kato]
	n_A_BODY_DEF_PLUS = ((A_BODY_DEF_PLUS.value != "") ? eval(A_BODY_DEF_PLUS.value) : 0); // Changed after index revamp, default value to 0 [Kato]
	n_A_LEFT_DEF_PLUS = ((A_LEFT_DEF_PLUS.value != "") ? eval(A_LEFT_DEF_PLUS.value) : 0); // Changed after index revamp, default value to 0 [Kato]
	n_A_SHOULDER_DEF_PLUS = ((A_SHOULDER_DEF_PLUS.value != "") ? eval(A_SHOULDER_DEF_PLUS.value) : 0); // Changed after index revamp, default value to 0 [Kato]
	n_A_SHOES_DEF_PLUS = ((A_SHOES_DEF_PLUS.value != "") ? eval(A_SHOES_DEF_PLUS.value) : 0); // Changed after index revamp, default value to 0 [Kato]
	n_A_DEFplus = n_A_HEAD_DEF_PLUS + n_A_BODY_DEF_PLUS + n_A_LEFT_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS;

	n_A_ActiveSkill = eval(A_ActiveSkill.value);
	if(n_A_ActiveSkill >= 3000)
		n_A_ActiveSkill = InsertSkill[n_A_ActiveSkill -3000][2];
	else if(n_A_ActiveSkill >= 2000)
		n_A_ActiveSkill = AutoSpellSkill[n_A_ActiveSkill -2000][2];

	n_A_ActiveSkillLV = eval(A_ActiveSkillLV.value);
	n_A_SpeedPOT = eval(A_SpeedPOT.value);

	n_A_Equip[0] = eval(A_weapon1.value);
	n_A_Equip[1] = 0;
	if(n_Nitou)
		n_A_Equip[1] = eval(A_weapon2.value);
	n_A_Equip[2] = eval(A_head1.value);
	n_A_Equip[3] = eval(A_head2.value);
	n_A_Equip[4] = eval(A_head3.value);
	n_A_Equip[5] = eval(A_left.value);
	n_A_Equip[6] = eval(A_body.value);
	n_A_Equip[7] = eval(A_shoulder.value);
	n_A_Equip[8] = eval(A_shoes.value);
	n_A_Equip[9] = eval(A_acces1.value);
	n_A_Equip[10] = eval(A_acces2.value);

	SetEquip();

	n_A_WeaponLV = ItemOBJ[n_A_Equip[0]][4];
	n_A_Weapon_ATK = ItemOBJ[n_A_Equip[0]][3];
	n_A_Weapon_ATKplus = ((A_Weapon_ATKplus.value != "") ? eval(A_Weapon_ATKplus.value) : 0); // Changed after index revamp, default value to 0 [Kato]

	W_REF = 0;
	n_A_Weapon2_ATK = 0;
	n_A_WeaponLV_Minplus = 0;
	n_A_WeaponLV_Maxplus = 0;
	n_A_WeaponLV_seirenATK = 0;

	if(n_A_WeaponLV == 1){
		n_A_WeaponLV_seirenATK = n_A_Weapon_ATKplus * 2;
		if(n_A_Weapon_ATKplus >= 8){
			n_A_WeaponLV_Minplus = 1;
			n_A_WeaponLV_Maxplus = 3 * (n_A_Weapon_ATKplus - 7);
		}
	}else if(n_A_WeaponLV == 2){
		n_A_WeaponLV_seirenATK = n_A_Weapon_ATKplus * 3;
		if(n_A_Weapon_ATKplus >= 7){
			n_A_WeaponLV_Minplus = 1;
			n_A_WeaponLV_Maxplus = 5 * (n_A_Weapon_ATKplus - 6);
		}
	}else if(n_A_WeaponLV == 3){
		n_A_WeaponLV_seirenATK = n_A_Weapon_ATKplus * 5;
		if(n_A_Weapon_ATKplus >= 6){
			n_A_WeaponLV_Minplus = 1;
			n_A_WeaponLV_Maxplus = 8 * (n_A_Weapon_ATKplus - 5);
		}
	}else if(n_A_WeaponLV == 4){
		n_A_WeaponLV_seirenATK = n_A_Weapon_ATKplus * 7;
		if(n_A_Weapon_ATKplus >= 5){
			n_A_WeaponLV_Minplus = 1;
			n_A_WeaponLV_Maxplus = 14 * (n_A_Weapon_ATKplus - 4);
		}
	}

	n_A_Weapon2_ATKplus = 0;

	//custom Talon Tales Kris Enchantment
	Click_KrisEnchantment();

	//[Custom Talon Tales 2018-06-14 - Malangdo Enchantment] [Kato]
	tRO_Click_MalangdoEnchantment(n_A_Equip[0],n_A_Equip[1]);

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment] [NattWara]
	Click_BiolabWeaponEnchantment(n_A_Equip[0],n_A_Equip[1]);

	//[Custom Talon Tales 2018-07-12 - Eden Weapon Enchantment] [NattWara]
	Click_EdenWeaponEnchantment(n_A_Equip[0],n_A_Equip[1]);

	//[Custom Talon Tales 2018-07-12 - Headgear Enchantment (Biolab & Eden)] [NattWara]
	Click_HeadgearEnchantment(n_A_Equip[2]);

	//[Custom Talon Tales 2018-07-12 - Armor Enchantment (Biolab & Eden)] [NattWara]
	Click_BiolabArmorBodyEnchantment(n_A_Equip[6]);
	Click_EdenArmorBodyEnchantment(n_A_Equip[6]);

	//[Custom Talon Tales 2018-07-12 - Shield Enchantment (Biolab)] [NattWara]
	Click_BiolabArmorShieldEnchantment(n_A_Equip[5]);

	//[Custom Talon Tales 2018-07-12 - Garment Enchantment (Biolab & Eden)] [NattWara]
	Click_GarmentEnchantment(n_A_Equip[7]);

	//[Custom Talon Tales 2018-07-12 - Footgear Enchantment (Eden)] [NattWara]
	Click_FootgearEnchantment(n_A_Equip[8]);

	//[Custom Talon Tales 2018-07-12 - Accessory Enchantment (Biolab)] [NattWara]
	Click_AccessoryEnchantment(n_A_Equip[9],n_A_Equip[10]);

	//Mora & El Dicaste Enchant have 3 option. Can't fit that in with Biolab & Eden so I'm making new <tr> for it so different function.

	//[Custom Talon Tales 2018-07-12 - El Dicaste Enchants] [NattWara]
	Click_EDGarmentEnchantment(n_A_Equip[7]);
	Click_EDFootgearEnchantment(n_A_Equip[8]);
	Click_EDAccessoryEnchantment(n_A_Equip[9],n_A_Equip[10]);
	Click_LOEDEnchantment(n_A_Equip[9],n_A_Equip[10]);

	//[Custom Talon Tales 2018-07-12 - Mora Enchants] [NattWara]
	Click_MoraArmorEnchantment(n_A_Equip[6]);
	Click_MoraGarmentEnchantment(n_A_Equip[7]);
	Click_MoraAccessoryEnchantment(n_A_Equip[9],n_A_Equip[10]);

	if(n_Nitou){
		W_REF2 = 0;
		n_A_Weapon2LV = ItemOBJ[n_A_Equip[1]][4];
		n_A_Weapon2_ATK = ItemOBJ[n_A_Equip[1]][3];
		n_A_Weapon2_ATKplus = eval(document.calcForm.A_Weapon2_ATKplus.value);

		n_A_Weapon2LV_seirenATK = 0;
		n_A_Weapon2LV_Minplus = 0;
		n_A_Weapon2LV_Maxplus = 0;
		if(n_A_Weapon2LV == 1){
			n_A_Weapon2LV_seirenATK = n_A_Weapon2_ATKplus * 2;
			if(n_A_Weapon2_ATKplus >= 8){
				n_A_Weapon2LV_Minplus = 1;
				n_A_Weapon2LV_Maxplus = 3 * (n_A_Weapon2_ATKplus - 7);
			}
		}else if(n_A_Weapon2LV == 2){
			n_A_Weapon2LV_seirenATK = n_A_Weapon2_ATKplus * 3;
			if(n_A_Weapon2_ATKplus >= 7){
				n_A_Weapon2LV_Minplus = 1;
				n_A_Weapon2LV_Maxplus = 5 * (n_A_Weapon2_ATKplus - 6);
			}
		}else if(n_A_Weapon2LV == 3){
			n_A_Weapon2LV_seirenATK = n_A_Weapon2_ATKplus * 5;
			if(n_A_Weapon2_ATKplus >= 6){
				n_A_Weapon2LV_Minplus = 1;
				n_A_Weapon2LV_Maxplus = 8 * (n_A_Weapon2_ATKplus - 5);
			}
		}else if(n_A_Weapon2LV == 4){
			n_A_Weapon2LV_seirenATK = n_A_Weapon2_ATKplus * 7;
			if(n_A_Weapon2_ATKplus >= 5){
				n_A_Weapon2LV_Minplus = 1;
				n_A_Weapon2LV_Maxplus = 14 * (n_A_Weapon2_ATKplus - 4);
			}
		}
	}

	n_A_card[0] = eval(A_weapon1_card1.value);
	n_A_card[1] = eval(A_weapon1_card2.value);
	n_A_card[2] = eval(A_weapon1_card3.value);
	n_A_card[3] = eval(A_weapon1_card4.value);
	if(n_Nitou){
		n_A_card[4] = eval(A_weapon2_card1.value);
		n_A_card[5] = eval(A_weapon2_card2.value);
		n_A_card[6] = eval(A_weapon2_card3.value);
		n_A_card[7] = eval(A_weapon2_card4.value);
	}else{
		for(var i=4;i<=7;i++)
			n_A_card[i] = 0;
	}
	n_A_card[8] = eval(A_head1_card.value);
	n_A_card[9] = eval(A_head2_card.value);
	n_A_card[10] = eval(A_left_card.value);
	n_A_card[11] = eval(A_body_card.value);
	n_A_card[12] = eval(A_shoulder_card.value);
	n_A_card[13] = eval(A_shoes_card.value);
	n_A_card[14] = eval(A_acces1_card.value);
	n_A_card[15] = eval(A_acces2_card.value);

	SetCard();

	n_A_Weapon_zokusei = eval(A_Weapon_zokusei.value);
	n_A_Weapon2_zokusei = n_A_Weapon_zokusei;


	if(n_A_Weapon_zokusei == 0){
		for(j=0;ItemOBJ[n_A_Equip[0]][j +11] != 0;j += 2){
			if(20 == ItemOBJ[n_A_Equip[0]][j +11])
				n_A_Weapon_zokusei = ItemOBJ[n_A_Equip[0]][j +12];
		}
		for(j=0;ItemOBJ[n_A_Equip[1]][j +11] != 0;j += 2){
			if(20 == ItemOBJ[n_A_Equip[1]][j +11])
				n_A_Weapon2_zokusei = ItemOBJ[n_A_Equip[1]][j +12];
		}

		if(201 <= cardOBJ[n_A_card[0]][0] && cardOBJ[n_A_card[0]][0] <= 204)
			n_A_Weapon_zokusei = cardOBJ[n_A_card[0]][0] -200;
		if(201 <= cardOBJ[n_A_card[4]][0] && cardOBJ[n_A_card[4]][0] <= 204)
			n_A_Weapon2_zokusei = cardOBJ[n_A_card[4]][0] -200;

		if(n_A_WeaponType==10 || (17 <= n_A_WeaponType && n_A_WeaponType <=21))
			n_A_Weapon_zokusei = ArrowOBJ[n_A_Arrow][1];
	}
	
	// Manage Neutral endow from SQI Bonus
	// Mjolnir#84#14th Bonus, Djinn#1380#14th Bonus, Evangelist#1382#14th Bonus, Suiken#1390#14th Bonus, Hira Shurikat#1385#14th Bonus
	if (!Taijin && ((84 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 14) > -1) 	||
					(1380 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 14) > -1) ||
					(1382 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 14) > -1) ||
					(1385 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 14) > -1) ||
					(1390 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 14) > -1)))
		n_A_Weapon_zokusei = 0;

	n_A_PassSkill = new Array();
	for(var i=0;JobSkillPassOBJ[n_A_JOB][i] != 999;i++){
		var wOBJ = document.getElementById("A_skill"+i);
		n_A_PassSkill[i] = eval(wOBJ.value);
	}

	if(n_SkillSW){
		n_A_PassSkill2[0] = eval(A2_Skill0.value);
		n_A_PassSkill2[1] = eval(A2_Skill1.value);
		n_A_PassSkill2[2] = eval(A2_Skill2.value);
		n_A_PassSkill2[3] = eval(A2_Skill3.checked);
		n_A_PassSkill2[4] = eval(A2_Skill4.value);
		n_A_PassSkill2[5] = eval(A2_Skill5.checked);
		n_A_PassSkill2[6] = eval(A2_Skill6.value);
		n_A_PassSkill2[7] = eval(A2_Skill7.checked);
		n_A_PassSkill2[8] = eval(A2_Skill8.value);
		n_A_PassSkill2[9] = eval(A2_Skill9.value);
		n_A_PassSkill2[10] = eval(A2_Skill10.value);
		n_A_PassSkill2[11] = eval(A2_Skill11.checked);
		n_A_PassSkill2[12] = eval(A2_Skill12.checked);
		n_A_PassSkill2[13] = eval(A2_Skill13.value);
		n_A_PassSkill2[14] = eval(A2_Skill14.value);
	}

	if(n_Skill3SW){
		n_A_PassSkill3[0] = eval(A3_Skill0_1.value);
		n_A_PassSkill3[1] = eval(A3_Skill1_1.value);
		n_A_PassSkill3[2] = eval(A3_Skill2_1.value);
		n_A_PassSkill3[3] = eval(A3_Skill3_1.value);
		n_A_PassSkill3[4] = eval(A3_Skill4_1.value);
		n_A_PassSkill3[5] = eval(A3_Skill5_1.value);
		n_A_PassSkill3[6] = eval(A3_Skill6_1.value);
		n_A_PassSkill3[7] = eval(A3_Skill7.value);
		n_A_PassSkill3[8] = eval(A3_Skill8.value);
		n_A_PassSkill3[9] = eval(A3_Skill9.value);
		n_A_PassSkill3[10] = eval(A3_Skill10.value);
		n_A_PassSkill3[11] = eval(A3_Skill11.checked);
		if(n_A_PassSkill3[11]){
			n_A_PassSkill3[12] = eval(A3_Skill11_STR.value);
			n_A_PassSkill3[13] = eval(A3_Skill11_AGI.value);
			n_A_PassSkill3[14] = eval(A3_Skill11_VIT.value);
			n_A_PassSkill3[15] = eval(A3_Skill11_INT.value);
			n_A_PassSkill3[16] = eval(A3_Skill11_DEX.value);
			n_A_PassSkill3[17] = eval(A3_Skill11_LUK.value);
			n_A_PassSkill3[18] = eval(A3_Skill11a.checked);
		}

		if(n_A_PassSkill3[0]){
			n_A_PassSkill3[20] = eval(A3_Skill0_2.value);
			n_A_PassSkill3[30] = eval(A3_Skill0_3.value);
			n_A_PassSkill3[46] = eval(A3_Skill0_4.value);
			whistle_pd_bonus = eval(whistle_pd_bonus_select.value)
			whistle_flee_bonus = eval(whistle_flee_bonus_select.value)
		}
		if(n_A_PassSkill3[1]){
			n_A_PassSkill3[21] = eval(A3_Skill1_2.value);
			n_A_PassSkill3[31] = eval(A3_Skill1_3.value);
			sunset_bonus = eval(sunset_bonus_check.checked);
		}
		if(n_A_PassSkill3[2]){
			n_A_PassSkill3[22] = eval(A3_Skill2_2.value);
			n_A_PassSkill3[29] = eval(A3_Skill2_3.value);
			n_A_PassSkill3[32] = eval(A3_Skill2_4.value);
			n_A_PassSkill3[45] = eval(A3_Skill2_5.checked);
			bragi_bonus = eval(bragi_bonus_select.value);
		}
		if(n_A_PassSkill3[3]){
			n_A_PassSkill3[23] = eval(A3_Skill3_2.value);
			n_A_PassSkill3[33] = eval(A3_Skill3_3.value);
			apple_bonus = eval(apple_bonus_check.checked);
		}
		if(n_A_PassSkill3[4]){
			n_A_PassSkill3[24] = eval(A3_Skill4_2.value);
			n_A_PassSkill3[34] = eval(A3_Skill4_3.value);
			humming_bonus = eval(humming_bonus_check.checked);
		}
		if(n_A_PassSkill3[5]){
			n_A_PassSkill3[25] = eval(A3_Skill5_2.value);
			n_A_PassSkill3[35] = eval(A3_Skill5_3.value);
			fortune_bonus = eval(fortune_bonus_check.checked);
			fortune_extra_bonus = eval(fortune_bonus_select.value);
		}
		if(n_A_PassSkill3[6]){
			n_A_PassSkill3[26] = eval(A3_Skill6_2.value);
			n_A_PassSkill3[36] = eval(A3_Skill6_3.value);
			service_bonus = eval(service_bonus_select.value);
		}

	}
	if(n_Skill4SW){
		n_A_PassSkill3[40] = eval(A3_Skill40.checked);
		n_A_PassSkill3[41] = eval(A3_Skill41.value);
		n_A_PassSkill3[42] = eval(A3_Skill42.value);
		n_A_PassSkill3[43] = eval(A3_Skill43.value);
		n_A_PassSkill3[44] = eval(A3_Skill44.value);
	}
	if(n_Skill5SW){
		n_A_PassSkill5[0] = eval(A5_Skill0.checked);
		n_A_PassSkill5[1] = eval(A5_Skill1.checked);
		n_A_PassSkill5[2] = eval(A5_Skill2.checked);
		n_A_PassSkill5[3] = eval(A5_Skill3.checked);
		n_A_PassSkill5[4] = eval(A5_Skill4.checked);
		n_A_PassSkill5[5] = eval(A5_Skill5.checked);
	}
	if(n_Skill6SW){
		n_A_PassSkill6[0] = eval(A6_Skill0.value);
		n_A_PassSkill6[1] = eval(A6_Skill1.value);
		n_A_PassSkill6[2] = eval(A6_Skill2.value);
		n_A_PassSkill6[3] = eval(A6_Skill3.value);
		n_A_PassSkill6[4] = eval(A6_Skill4.value);
		n_A_PassSkill6[5] = eval(A6_Skill5.value);
		n_A_PassSkill6[6] = eval(A6_Skill6.checked);
	}
	if(n_Skill7SW){

		n_A_PassSkill7[0] = eval(A7_Skill0.checked);
		n_A_PassSkill7[1] = eval(A7_Skill1.checked);
		n_A_PassSkill7[2] = eval(A7_Skill2.checked);
		n_A_PassSkill7[3] = eval(A7_Skill3.value);
		n_A_PassSkill7[4] = eval(A7_Skill4.value);
		n_A_PassSkill7[5] = eval(A7_Skill5.value);
		n_A_PassSkill7[6] = eval(A7_Skill6.value);
		n_A_PassSkill7[7] = eval(A7_Skill7.value);
		n_A_PassSkill7[8] = eval(A7_Skill8.value);
		n_A_PassSkill7[9] = eval(A7_Skill9.checked);
		n_A_PassSkill7[10] = eval(A7_Skill10.checked);
		n_A_PassSkill7[11] = eval(A7_Skill11.checked);
		n_A_PassSkill7[12] = eval(A7_Skill12.checked);
		n_A_PassSkill7[13] = eval(A7_Skill13.checked);
		n_A_PassSkill7[14] = eval(A7_Skill14.checked);
		n_A_PassSkill7[15] = eval(A7_Skill15.checked);
	}
	if(n_Skill8SW){
		n_A_PassSkill8[0] = eval(A8_Skill0.value);
		n_A_PassSkill8[1] = eval(A8_Skill1.value);
		n_A_PassSkill8[2] = eval(A8_Skill2.checked);
		n_A_PassSkill8[3] = eval(A8_Skill3.value);
		n_A_PassSkill8[4] = eval(A8_Skill4.checked);
		n_A_PassSkill8[5] = eval(A8_Skill5.value);
		n_A_PassSkill8[6] = eval(A8_Skill6.value);
		n_A_PassSkill8[7] = eval(A8_Skill7.value);
		n_A_PassSkill8[8] = eval(A8_Skill8.value);
		n_A_PassSkill8[9] = eval(A8_Skill9.value);
		n_A_PassSkill8[10] = eval(A8_Skill10.value);
		n_A_PassSkill8[11] = eval(A8_Skill11.value);
		n_A_PassSkill8[12] = eval(A8_Skill12.value);
		n_A_PassSkill8[33] = eval(A8_Skill33.value);
		n_A_PassSkill8[34] = eval(A8_Skill34.value);

		n_A_PassSkill8[14] = eval(A8_Skill14.value);
		n_A_PassSkill8[15] = eval(A8_Skill15.value);
		n_A_PassSkill8[16] = eval(A8_Skill16.checked);
		n_A_PassSkill8[17] = eval(A8_Skill17.checked);
		n_A_PassSkill8[18] = eval(A8_Skill18.checked);
		n_A_PassSkill8[19] = eval(A8_Skill19.checked);
		n_A_PassSkill8[20] = eval(A8_Skill20.checked);
		n_A_PassSkill8[21] = eval(A8_Skill21.checked);
		n_A_PassSkill8[22] = eval(A8_Skill22.checked);
		n_A_PassSkill8[23] = eval(A8_Skill23.checked);
		n_A_PassSkill8[24] = eval(A8_Skill24.checked);
		n_A_PassSkill8[25] = eval(A8_Skill25.checked);
		n_A_PassSkill8[26] = eval(A8_Skill26.checked);
		n_A_PassSkill8[27] = eval(A8_Skill27.checked);
		n_A_PassSkill8[28] = eval(A8_Skill28.checked);
		n_A_PassSkill8[29] = eval(A8_Skill29.checked);
		n_A_PassSkill8[30] = eval(A8_Skill30.checked);
		n_A_PassSkill8[31] = eval(A8_Skill31.checked);
		n_A_PassSkill8[32] = eval(A8_Skill32.checked);
		n_A_PassSkill8[35] = eval(A8_Skill35.checked);
		n_A_IJYOU[0] = eval(A_IJYOU0.value);
		n_A_IJYOU[1] = eval(A_IJYOU1.value);
		n_A_IJYOU[2] = eval(A_IJYOU2.checked);
		n_A_IJYOU[3] = eval(A_IJYOU3.checked);
		eclage_food = eval(eclage_food_list.value);
		abrasive_food = eval(abrasive_food_check.checked);

		eden_rough_crystal_buff = eval(eden_rough_crystal_buff_check.checked);
		eden_purified_crystal_buff = eval(eden_purified_crystal_buff_check.checked);
		eden_high_crystal_buff = eval(eden_high_crystal_buff_check.checked);

		sting_slap_cocktail = eval(sting_slap_cocktail_check.checked) 							// [sc_start SC_DEF_RATE,1800000,10;]
		venatu_beep_cocktail = eval(venatu_beep_cocktail_check.checked)							// [sc_start SC_INCATKRATE,1800000,5;]
		old_dracula_mix_cocktail = eval(old_dracula_mix_cocktail_check.checked)					// [sc_start SC_JEXPBOOST,1800000,15;]
		spammers_heaven_cocktail = eval(spammers_heaven_cocktail_check.checked)					// [sc_start SC_INCASPDRATE,2700000,10;]
		seductive_bathory_cocktail = eval(seductive_bathory_cocktail_check.checked)				// [sc_start SC_CASTRATE,2700000,-10;]
		myst_case_suprise_cocktail = eval(myst_case_suprise_cocktail_check.checked)				// [sc_start SC_INCMATKRATE,1800000,5;]
		drip_of_yggdrasil_cocktail = eval(drip_of_yggdrasil_cocktail_check.checked)				// [sc_start SC_LIFEINSURANCE,1800000,0; sc_start SC_EXPBOOST,1800000,10;]
		moscow_headless_mule_cocktail = eval(moscow_headless_mule_cocktail_check.checked)		// [specialeffect2 320; sc_start4 SC_L_LIFEPOTION,600000,-3,10,0,0; sc_start SC_INCFLEE,600000,30;]
		blossoming_geographer_cocktail = eval(blossoming_geographer_cocktail_check.checked)		// [sc_start SC_MDEF_RATE,1800000,10;]
		
		bobo_boba_cocktail = eval(bobo_boba_cocktail_check.checked)
		wolfchev_nightcap_cocktail = eval(wolfchev_nightcap_cocktail_check.checked)
		chepet_match_cocktail = eval(chepet_match_cocktail_check.checked)
		dullahan_ale_cocktail = eval(dullahan_ale_cocktail_check.checked)
		sippin_galapago_cocktail = eval(sippin_galapago_cocktail_check.checked) 
		sleeper_dream_cocktail = eval(sleeper_dream_cocktail_check.checked)
		mobster_paradise_cocktail = eval(mobster_paradise_cocktail_check.checked)
	}
	//custom Talon Tales SQI
	if(n_SQI_Bonus_SW){
		SQI_Bonus_Effect[0] = SQI_Bonus_1.value;
		SQI_Bonus_Effect[1] = SQI_Bonus_2.value;
		SQI_Bonus_Effect[2] = SQI_Bonus_3.value;
		SQI_Bonus_Effect[3] = SQI_Bonus_4.value;
	}
	//custom Talon Tales - Skill9SW deactivated
	if(n_Skill9SW){
		n_A_PassSkill9[0] = eval(A9_Skill0.value);
		n_A_PassSkill9[1] = eval(ARG_RC0.value);
		n_A_PassSkill9[2] = eval(A9_Skill1.value);
		n_A_PassSkill9[3] = eval(ARG_RC1.value);
		n_A_PassSkill9[4] = eval(A9_Skill2.value);
		n_A_PassSkill9[5] = eval(ARG_RC2.value);
		n_A_PassSkill9[6] = eval(A9_Skill3.value);
		n_A_PassSkill9[7] = eval(ARG_RC3.value);
		n_A_PassSkill9[8] = eval(A9_Skill4.value);
		n_A_PassSkill9[9] = eval(ARG_RC4.value);
		n_A_PassSkill9[10] = eval(A9_Skill5.value);
		n_A_PassSkill9[11] = eval(ARG_RC5.value);
		n_A_PassSkill9[12] = eval(A9_Skill6.value);
		n_A_PassSkill9[13] = eval(ARG_RC6.value);
		n_A_PassSkill9[14] = eval(A9_Skill7.value);
		n_A_PassSkill9[15] = eval(ARG_RC7.value);
		n_A_PassSkill9[16] = eval(A9_Skill8.value);
		n_A_PassSkill9[17] = eval(ARG_RC8.value);
		n_A_PassSkill9[18] = eval(A9_Skill9.value);
		n_A_PassSkill9[19] = eval(ARG_RC9.value);
		n_A_PassSkill9[20] = eval(A9_Skill10.value);
		n_A_PassSkill9[21] = eval(ARG_RC10.value);
		n_A_PassSkill9[22] = eval(A9_Skill11.value);
		n_A_PassSkill9[23] = eval(ARG_RC11.value);
		n_A_PassSkill9[24] = eval(A9_Skill12.value);
		n_A_PassSkill9[25] = eval(ARG_RC12.value);
		n_A_PassSkill9[26] = eval(A9_Skill13.value);
		n_A_PassSkill9[27] = eval(ARG_RC13.value);
		n_A_PassSkill9[28] = eval(A9_Skill14.value);
		n_A_PassSkill9[29] = eval(ARG_RC14.value);
		n_A_PassSkill9[30] = eval(ARG_RC15.value);
		n_A_PassSkill9[31] = eval(ARG_RC16.value);
		n_A_PassSkill9[32] = eval(ARG_RC17.value);
		n_A_PassSkill9[33] = eval(ARG_RC18.value);
		n_A_PassSkill9[34] = eval(ARG_RC19.value);
		n_A_PassSkill9[35] = eval(ARG_RC20.value);
		n_A_PassSkill9[36] = eval(ARG_RC21.value);
		n_A_PassSkill9[37] = eval(ARG_RC22.value);
		n_A_PassSkill9[38] = eval(ARG_RC23.value);
		n_A_PassSkill9[39] = eval(ARG_RC24.value);
		n_A_PassSkill9[40] = eval(ARG_RC25.value);
		n_A_PassSkill9[41] = eval(ARG_RC26.value);
		n_A_PassSkill9[42] = eval(ARG_RC27.value);
		n_A_PassSkill9[43] = eval(ARG_RC28.value);
		n_A_PassSkill9[44] = eval(ARG_RC29.value);
		n_A_PassSkill9[45] = eval(ARG_RC30.value);
		n_A_PassSkill9[46] = eval(ARG_RC31.value);
		n_A_PassSkill9[47] = eval(ARG_RC32.value);
		n_A_PassSkill9[48] = eval(ARG_RC33.value);
		n_A_PassSkill9[49] = eval(ARG_RC34.value);
		n_A_PassSkill9[50] = eval(ARG_RC35.value);
		n_A_PassSkill9[51] = eval(ARG_RC36.value);
		n_A_PassSkill9[52] = eval(ARG_RC37.value);
		n_A_PassSkill9[53] = eval(ARG_RC38.value);
		n_A_PassSkill9[54] = eval(ARG_RC39.value);
		n_A_PassSkill9[55] = eval(ARG_RC40.value);
	}

	for(i=0;i<=22;i++)
		n_B[i] = MonsterOBJ[B_Enemy.value][i];

	n_A_BodyZokusei = StPlusCard(198);
	if(n_A_BodyZokusei==0)
		n_A_BodyZokusei = StPlusCalc2(198);
	if((n_A_JOB == 13 || n_A_JOB == 27) && CardNumSearch(456))
		n_A_BodyZokusei = 6;
	if(n_A_PassSkill6[6])
		n_A_BodyZokusei = 6;

	for(var i=0;i<=6;i++)
		n_Delay[i] = 0;

	for(i=1;i<=201;i++){
		n_tok[i] = 0;
		n_tok[i] += StPlusCalc2(i);
		n_tok[i] += StPlusCard(i);
	}
	
	n_tok[218] = 0;
	n_tok[219] = 0;
	
	for(i=290;i<=409;i++){
		n_tok[i] = 0;
		n_tok[i] += StPlusCalc2(i);
		n_tok[i] += StPlusCard(i);
	}
	
	manage_sqi_bonus();
	StPlusCalc();

	if(n_A_WeaponType != 10 && n_A_WeaponType !=14 && n_A_WeaponType !=15 && n_A_WeaponType !=17 && n_A_WeaponType !=18 && n_A_WeaponType !=19 && n_A_WeaponType !=20 && n_A_WeaponType !=21){
		n_A_ATK_w = Math.round(Math.floor(n_A_STR/10) * Math.floor(n_A_STR/10));
		n_A_ATK   = n_A_STR + n_A_ATK_w + Math.floor(n_A_DEX / 5) + Math.floor(n_A_LUK / 5);
	}else{
		n_A_ATK_w = Math.round(Math.floor(n_A_DEX/10) * Math.floor(n_A_DEX/10));
		n_A_ATK   = n_A_DEX + n_A_ATK_w + Math.floor(n_A_STR / 5) + Math.floor(n_A_LUK / 5);
	}
	
	// Manage advanced Special Effect bonus
	for (var i = 8; i < 12; ++i) {
		// Glorious Tablet#1094 - [Every Refine Level] ATK + 20 
		if (n_A_PassSkill8[i] == 13 && EquipNumSearch(1094)) // FIXME : Only applies to PvP
			n_tok[17] += 20 * n_A_Weapon_ATKplus;
		// Elemental Sword#939 + Elemental Boots#1819 [Every Refine Levels] MATK + 1%
		if (n_A_PassSkill8[i] == 17 && EquipNumSearch(1821))
		{
			if (939 == n_A_Equip[0])
				n_tok[89] += n_A_Weapon_ATKplus;
			else if (n_Nitou && 939 == n_A_Equip[1])
				n_tok[89] += n_A_Weapon2_ATKplus;
		}
	}
	
	// Manage weapon attack bonus, those bonus are impacted by the Size multiplier
	// A Drum on the Battlefield - Weapon ATK + 25 + 25 * SkillLV
	if (n_A_PassSkill3[9]) {
		dmgReduction = 0;
		// Talon Tales Update 01.05.21 Bows + Guns -50%
		dmgReduction += (n_A_WeaponType == 10 || n_A_WeaponType==17 || 18 == n_A_WeaponType || 19 == n_A_WeaponType || 20 == n_A_WeaponType || 21 == n_A_WeaponType) ? 50 : 0;
		n_A_Weapon_ATK += (25 + 25 * n_A_PassSkill3[9]) * (100 - dmgReduction) / 100;
		n_A_Weapon2_ATK += (25 + 25 * n_A_PassSkill3[9]) * n_Nitou * (100 - dmgReduction) / 100;
	}
	
	// The Ring of Nibelugen - Weapon ATK + 50 + 25 * SkillLV
	if (n_A_PassSkill3[10] && n_A_WeaponLV == 4) {
		dmgReduction = 0;
		// Talon Tales Update 01.05.21 Bows + Guns -50%
		dmgReduction += (n_A_WeaponType == 10 || n_A_WeaponType==17 || 18 == n_A_WeaponType || 19 == n_A_WeaponType || 20 == n_A_WeaponType || 21 == n_A_WeaponType) ? 50 : 0;
		n_A_Weapon_ATK += (50 + 25 * n_A_PassSkill3[10]) * (100 - dmgReduction) / 100;
		n_A_Weapon2_ATK += (50 + 25 * n_A_PassSkill3[10]) * n_Nitou * (100 - dmgReduction) / 100;
	}
	
	// Volcano - ATK bonus on Fire Armor - Weapon ATK + 10 * SkillLV
	if (n_A_PassSkill6[0] == 0 && n_A_PassSkill6[1] >= 1 && n_A_BodyZokusei==3) {
		n_A_Weapon_ATK += n_A_PassSkill6[1] * 10;
		n_A_Weapon2_ATK += n_A_PassSkill6[1] * 10 * n_Nitou;
	}
	
	// Impositio Manus - Weapon ATK + 5 * SkillLV
	n_A_Weapon_ATK += n_A_PassSkill2[2] * 5;
	n_A_Weapon2_ATK += n_A_PassSkill2[2] * 5 * n_Nitou;	

	// Concentration#256 - Weapon ATK + 5 * SkillLV
	n_A_Weapon_ATK = Math.floor((1 + SkillSearch(256) * 0.05) * n_A_Weapon_ATK);
	n_A_Weapon2_ATK = Math.floor((1 + SkillSearch(256) * 0.05) * n_A_Weapon2_ATK) * n_Nitou;

	// Manage [SC_INCATKRATE], apply in the calc the SC with highest bonus
	watk_incatkrate = 1;

	// Venatu's Beep Cocktail - Weapon ATK Rate + 5% [SC_INCATKRATE] (Applied after SC_CONCENTRATION)
	if (venatu_beep_cocktail)
		watk_incatkrate = Math.max(watk_incatkrate, 1.05);
	
	// Gospel - Weapon ATK Rate + 100% [SC_INCATKRATE]
	if (n_A_PassSkill5[3])
		watk_incatkrate = Math.max(watk_incatkrate, 2);
	
	n_A_Weapon_ATK = Math.floor(n_A_Weapon_ATK * watk_incatkrate);
	n_A_Weapon2_ATK = Math.floor(n_A_Weapon2_ATK * watk_incatkrate) * n_Nitou;

	// Manage [SC_PROVOKE] (Applied after SC_INCATKRATE)
	watk_provoke = 1;

	// Aloevera - Provoke Lv 1 effect, does not stack with self Provoke
	if (n_A_PassSkill2[12])
		watk_provoke = Math.max(watk_provoke, 1.05);
	
	// Provoke - Weapon ATK + 2 + 3 * SkillLV
	if (n_A_PassSkill6[5])
		watk_provoke = Math.max(watk_provoke, 1.02 + 0.03 * n_A_PassSkill6[5]);
	
	// Auto Berserk - Provoke Lv 10 effect
	if (SkillSearch(12))
		watk_provoke = Math.max(watk_provoke, 1.32);
	
	n_A_Weapon_ATK = Math.floor(n_A_Weapon_ATK * watk_provoke);
	n_A_Weapon2_ATK = Math.floor(n_A_Weapon2_ATK * watk_provoke) * n_Nitou;

	//Galaxy Circlet - [Loa] - 2018-07-03
	if(EquipNumSearch(1163)){
		n_tok[13] += n_A_HEAD_DEF_PLUS * 10;
		n_tok[14] += n_A_HEAD_DEF_PLUS * 10;
		n_tok[61] += Math.floor(n_A_HEAD_DEF_PLUS/2);
		n_tok[62] += Math.floor(n_A_HEAD_DEF_PLUS/2);
		n_tok[63] += Math.floor(n_A_HEAD_DEF_PLUS/2);
	}
	
	// #125 - Lucky Case - [Mage, Archer, Acolyte Class] MHP +175, Perfect Dodge +1 - [Swordman, Merchant, Thief Class] MSP +50, VIT +2
	if (n_A_PassSkill8[0] == 125)
	{
		current_job_category = n_A_JobSearch();
		if (current_job_category > 2 && current_job_category < 6)
		{
			n_tok[11] += 1;
			n_tok[13] += 175;
		}
		else (1 == current_job_category || 2 == current_job_category || 6 == current_job_category)
		{
			n_tok[3] += 2;
			n_tok[14] += 50;
		}
	}

	// Sword Master Crown#1745
	if (EquipNumSearch(1745))
	{
		//[Base Level >= 75] - ATK + 5
		if (n_A_BaseLV >= 75)
			n_tok[17] += 5;
		//[Sword Mastery#3] at Level 10 - HIT + 10 and reduce SP cost of skills by 5%
		if (10 == SkillSearch(3))
		{
			n_tok[8] += 10;
			n_tok[72] -= 5;
		}
		//[Spear Mastery#69] at Level 10 - After Cast Delay - 7%
		n_tok[74] += 7 * Math.max(0, SkillSearch(69) - 9);
		//[Axe Mastery#241] at Level 10 - Cast Time - 10%
		n_tok[73] -= 10 * Math.max(0, SkillSearch(241) - 9);
		//[Katar Mastery#81] at Level 10 - Critical Hit damage + 10%
		n_tok[70] += 10 * Math.max(0, SkillSearch(81) - 9);
		//[Mace Mastery#89] at Level 10 - ASPD + 7%
		n_tok[12] += 7 * Math.max(0, SkillSearch(89) - 9);
	}

	//Jolly Roger Hat -[Loa] - 2018-07-03
	if(EquipNumSearch(1186)){
		if(n_A_HEAD_DEF_PLUS > 7){
			n_tok[41] += 3;
		}
		if(n_A_HEAD_DEF_PLUS > 8){
			n_tok[61] += 3;
		}
	}
	//White King Tiger Doll Hat - [Loa] - 2018-07-03
	if(EquipNumSearch(1214)){
		n_tok[32] += n_A_HEAD_DEF_PLUS;
	}
	//Jade Rabbit Hat -[Loa] - 2017-07-03
	if(EquipNumSearch(1218) && n_A_HEAD_DEF_PLUS > 4){
		n_tok[17] += n_A_HEAD_DEF_PLUS - 4;
		n_tok[89] += n_A_HEAD_DEF_PLUS - 4;
	}
	//Wakwak Card - For every 10 Base STR, ATK + 5
	if(CardNumSearch(560)){
		n_tok[17] += 5 * Math.floor(SU_STR / 10);
	}
	//Sakura Coronet + Romantic Flower - [Loa] - 2018-07-04
	if(EquipNumSearch(1236) && n_A_HEAD_DEF_PLUS > 7){
		n_tok[16] += n_A_HEAD_DEF_PLUS;
	}
	//Sakura Coronet + White Petal - [Loa] - 2018-07-04
	if(EquipNumSearch(1237) && n_A_HEAD_DEF_PLUS > 5){
		n_tok[73] -= Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	//Sakura Coronet + Romantic Leaf - [Loa] - 2018-07-04
	if(EquipNumSearch(1238) && n_A_HEAD_DEF_PLUS > 3){
		n_tok[14] += n_A_HEAD_DEF_PLUS * 5;
	}
	//White Feather - [Loa] - 2018-07-04
	if(EquipNumSearch(1255) && n_A_HEAD_DEF_PLUS >= 5){
		n_tok[8] -= 10;
		n_tok[15] += 10;
		if(n_A_HEAD_DEF_PLUS >= 7){
			n_tok[8] -= 3;
			n_tok[15] += 3;
			if(n_A_HEAD_DEF_PLUS >= 9){
				n_tok[8] -= 3;
				n_tok[15] += 3;
			}
		}
	}
	//White Feather + Pipe - [Loa] - 2018-07-04
	if(EquipNumSearch(1257) && n_A_HEAD_DEF_PLUS >= 7){
		n_tok[8] += 1;
		n_tok[15] += 2;
		if(n_A_HEAD_DEF_PLUS >= 9){
			n_tok[8] += 1;
			n_tok[15] += 2;
		}
	}
	// Undine Spear#1681 [Every Refine Level]  MaxHP + 1%
	if (EquipNumSearch(1681)) {
		n_tok[15] += n_A_Weapon_ATKplus
	}
	// Surfer Swimsuit#1682 [Every Refine Level] SP + 2
	if (EquipNumSearch(1682)) {
		n_tok[14] += n_A_BODY_DEF_PLUS * 2
	}
	// Oxygen Bottle#1683 [Every Refine Level] HIT + 1, FLEE + 1
	if (EquipNumSearch(1683)) {
		n_tok[8] += n_A_SHOULDER_DEF_PLUS
		n_tok[9] += n_A_SHOULDER_DEF_PLUS
	}
	// Prison Uniform#1689 Every Refine Level] HIT + 1
	if (EquipNumSearch(1689)) {
		n_tok[8] += n_A_BODY_DEF_PLUS
		
		// Set with Thief Handcuff#1691 [Every Refine Level] ATK + 1
		if (EquipNumSearch(1691)) {
			n_tok[17] += n_A_BODY_DEF_PLUS
		}
	}
	// Set Thief Handcuff#1691 + Shackles#323 [Every Refine Level] MaxSP + 1%
	if (EquipNumSearch(1691) && EquipNumSearch(323)) {
		n_tok[16] += n_A_SHOES_DEF_PLUS
	}
	
	// 	Hardrock Mammoth Card#581 [Every Refine Level] MaxHP + 2%
	if (CardNumSearch(581))
		n_tok[15] += n_A_BODY_DEF_PLUS * 2;
	
	// Eclase Stat Gloves
	/*
		STR Glove#1704
		[Every 10 points of STR] ATK + 1
		[Base STR >= 80] ATK + 1%
	*/
	n_tok[17] += Math.floor(SU_STR / 10) * EquipNumSearch(1704);
	n_tok[80] += (SU_STR >= 80 ? 1 : 0) * EquipNumSearch(1704);

	/*
		AGI Glove#1705
		[Every 10 points of AGI] FLEE + 1
		[Base AGI >= 80] Perfect Dodge + 1
	*/
	
	n_tok[9] += Math.floor(SU_AGI / 10) * EquipNumSearch(1705);
	n_tok[11] += (SU_AGI >= 80 ? 1 : 0) * EquipNumSearch(1705);
	
	/*
		VIT Glove#1706
		[Every 10 points of VIT] MaxHP + 50
		[Base VIT >= 80] DEF + 1 MaxHP + 1%
	*/
	
	n_tok[13] += 50 * Math.floor(SU_VIT / 10) * EquipNumSearch(1706);
	if (SU_VIT >= 80 && EquipNumSearch(1706))
	{
		n_tok[15] += 1;
		n_tok[18] += 1;
	}
	
	/*
		INT Glove#1707
		[Every 6 points of INT] MATK + 1
		[Base INT >= 80] MATK + 1%
	*/
	
	n_tok[98] += Math.floor(SU_INT / 6) * EquipNumSearch(1707);
	n_tok[89] += (SU_INT >= 80 ? 1 : 0) * EquipNumSearch(1707);
	
	/*
		DEX Glove#1708
		[Every 4 points of DEX] HIT + 1
		[Base DEX >= 80] Ranged Attack + 2%
	*/
	
	n_tok[8] += Math.floor(SU_DEX / 4) * EquipNumSearch(1708);
	n_tok[25] += 2 * (SU_DEX >= 80 ? 1 : 0) * EquipNumSearch(1708);
	
	/*
		LUK Glove#1709
		[Every 10 points of LUK] CRIT + 1
		[Base LUK >= 60] Critical Attack + 3%
	*/
	
	n_tok[10] += Math.floor(SU_LUK / 10) * EquipNumSearch(1709);
	n_tok[70] += 3 * (SU_LUK >= 80 ? 1 : 0) * EquipNumSearch(1709);

	//brave assassin damacus [Loa] 2018-07-24
	if(EquipNumSearch(897)){
		// [Rogue Class]
		if(n_A_JobSearch2() == 14)
			n_tok[89] += 15; // MATK + 15%

		// [Ninja Class]
		else if(n_A_JOB == 44){
			n_tok[89] += 15; // MATK + 15%
			n_tok[10] += 20; // CRIT + 20
			n_tok[70] += 10; // Critical Attack damage + 10%
		}

		// [Soul Linker]
		else if(n_A_JOB == 43)
			n_tok[10] += 50; // CRIT + 50
	}
	
	// Angra Mantis Card#422 - [Thief Class][Every Refine] Critical Damage + 1%
	if (CardNumSearch(422) && n_A_JobSearch() == 2)
		n_tok[70] += n_A_HEAD_DEF_PLUS;
	
	// Elite Engineer Armor & Battle Greaves & Captain's Manteau Equip Set#972 - Increases the effectiveness of heal received from [Heal] and [Potion Pitcher] by 10%
	if (EquipNumSearch(972))
	{
		n_tok[92] += 10;
		n_tok[199] += 10;
	}

	//[Talon Tales Custom 2018-07-25 - Brave Gladiator Blade + 15% MATK for Crusader/Paladin] [Amor]
	if (EquipNumSearch(900) && (n_A_JobSearch2() == 13 || n_A_JobSearch2() == 14))
		n_tok[89] += 15;

	//[Talon Tales Custom 2018-07-26 - Valorous Assassin Damascus + 15% MATK for Rogue/Stalker or Ninja] [Amor]
	if (EquipNumSearch(898) && (n_A_JobSearch2() == 14 || n_A_JOB == 44))
		n_tok[89] += 15;

	//[Talon Tales Custom 2018-07-29 - Glorious Staff of Recovery + 15% MATK for Priest/HP] [Amor]
	if (EquipNumSearch(1085) && n_A_JobSearch2() == 9)
		n_tok[89] += 15;

	/* Malangdo Rentals
	   Hairtail [Rental]#1808 - [Base Level  > 94] - ATK + 50
	   Marlin 	[Rental]#1810 - [Base Level  > 94] - ATK + 30
	   Saurel 	[Rental]#1811 - [Base Level  > 94] - ATK + 10, MATK + 5%
	   Tuna 	[Rental]#1812 - [Base Level  > 94] - ATK + 20
	*/
	if (n_A_BaseLV > 94)
	{
		n_tok[17] += 50 * EquipNumSearch(1808) + 30 * EquipNumSearch(1810) + 10 * EquipNumSearch(1811) + 20 * EquipNumSearch(1812);
		n_tok[89] += 5 * EquipNumSearch(1811);
	}

	// Valorous Battlefield Morning Star#907 - [Refine level 8-10] - ATK + 30
	if (EquipNumSearch(907) && n_A_Weapon_ATKplus >= 8)
		n_tok[17] += 30;

	// Brave Battlefield Morning Star#908 - [Merchant Class]			
	if (EquipNumSearch(908) && n_A_JobSearch() == 6) {
		n_tok[12] += 10; // ASPD + 10%
		
		/*
			[Refine level 8-10] 
			- ATK + 50
			- Increases healing with Potion Pitcher by 15% and Slim Potion Pitcher by 5%.
		*/
		if (n_A_Weapon_ATKplus >= 8)
		{
			n_tok[17] += 50;
			n_tok[93] += 15;
			n_tok[201] += 5;
		}
	}
	/*
		Gloirous Morning Star (Monk demi-human reduction)
		[Monk/Champion Class]
		55% Demi-human instead of 75%
	*/
	if(EquipNumSearch(1086) && n_A_JobSearch2() == 15) {
		n_tok[37] -= 20;
	}
	/*
		Glorious Revolver (damage)
		[Refine level 8-10]
		ATK + 25
	*/
	if(EquipNumSearch(1099) && n_A_Weapon_ATKplus >= 8) {
		n_tok[17] += 25;
	}

	// Glorious Two-handed Axe#1087 - [Merchant Class] ATK + 100
	if (n_A_JobSearch() == 6)
			n_tok[17] += 100 * EquipNumSearch(1087); // FIXME : Only applies to WoE

	/*
		Enhanced Hat of the Sun God#1654 - ATK part [Nattwara]
		[Refine Rate >= 5] ATK + 4, MATK + 1%
		[Refine Rate >= 7] ATK + 6, MATK + 1%
		[Refine Rate >= 8] ATK + 6, MATK + 2%
	*/
	if (EquipNumSearch(1654)) {
		if (n_A_HEAD_DEF_PLUS > 4)
			n_tok[17] += 4;

		if (n_A_HEAD_DEF_PLUS > 6)
			n_tok[17] += 6;

		if (n_A_HEAD_DEF_PLUS > 7)
			n_tok[17] += 6;
	}

	// Doom Slayer#621 - [If Base STR >= 95] ATK + 340, Causes Stun effect to enemies by 30% 
	if (SU_STR >= 95 && EquipNumSearch(621))
	{
		n_tok[17] += 340;
		n_tok[131] += 30;
	}
	// Holgren's Refining Hammer#625 - [If Base STR >= 44] ATK + 44
	if(SU_STR >= 44)
		n_tok[17] += 44 * EquipNumSearch(625);
	// Thief Ring#442 - [If Base AGI >= 90] ATK + 10
	if(SU_AGI >= 90)
		n_tok[17] += 10 * EquipNumSearch(442);
	// Krasnaya#1160 - [If Base STR >= 95] ATK + 20
	if(SU_STR >= 95)
		n_tok[17] += 20 * EquipNumSearch(1160);
	// Berchel Axe#1164 - [If Base LUK >= 90] ATK + 20
	if(SU_LUK >= 90)
		n_tok[17] += 20 * EquipNumSearch(1164);
	// Imperial Spear#1460 - [Every 2 Refine Levels] ATK + 2
	if(EquipNumSearch(1460)) {
		n_tok[17] += 2 * Math.floor(n_A_Weapon_ATKplus / 2)
		
		// [Every [Spear Mastery] Level] ATK + 2
		n_tok[17] += 2 * SkillSearch(69);
	}
	// Halloween Midas Whisper#1526 - [If Base STR >= 80] ATK + 30
	if (SU_STR >= 80)
		n_tok[17] += 30 * EquipNumSearch(1526);
	// Archer Figure#1120 - [Archer Class] ATK + 10
	if (n_A_JobSearch() == 4)
		n_tok[17] += 10 * EquipNumSearch(1120);
	// Baphomet Horns#953 - ATK + JobLv * 2 / 7
	n_tok[17] += Math.floor(n_A_JobLV * 2 / 7) * EquipNumSearch(953);
	// Veteran Axe#1165 -  ATK + 10 * n (with n number of smithing skills mastered)
	n_tok[17] += 10 * SkillSearch(311) * EquipNumSearch(1165);
	// Glorious Two-handed Axe#1087 - [Merchant Class] ATK + 100
	if (n_A_JobSearch() == 6)
		n_tok[17] += 100 * EquipNumSearch(1087); // FIXME : Only applies to PvP
	// Mythical Lion Mask#676 - [Taekwon Class] [Every Refine Level] ATK + 2
	if (n_A_JobSearch() == 41)
	{
		n_tok[17] += n_A_HEAD_DEF_PLUS * 2 * EquipNumSearch(676);
		n_tok[131] += 10; // Add a 10% chance of auto casting Stun on the enemy with melee attack.
	}
	// Aquarius Crown#1274, Aquarius Diadem#1275, Cancer Crown#1276 - [If Refine Level >= 7] ATK + 15
	if (n_A_HEAD_DEF_PLUS >= 7)
		n_tok[17] += 15 * (EquipNumSearch(1274) + EquipNumSearch(1275) + EquipNumSearch(1276));
	// Scorpio Crown#1290 - [If Refine Level == 10] ATK + 5
	if (n_A_HEAD_DEF_PLUS == 10)
		n_tok[17] += 5 * EquipNumSearch(1290);
	// Scorpio Diadem#1291 - [If Refine Level >= 7] ATK + 5
	if (n_A_HEAD_DEF_PLUS >= 7)
		n_tok[17] += 5 * EquipNumSearch(1291);

	// Giant Whisper card#267 - [If Base STR >= 80] ATK + 20
	if (SU_STR >= 80)
		n_tok[17] += 20 * CardNumSearch(267);
	// Ifrit card#492 - ATK + JobLV / 5
	n_tok[17] += Math.floor(n_A_JobLV /5) * CardNumSearch(492);
	// Gold Scaraba card#528 - ATK + JobLV / 5
	n_tok[17] += Math.floor(n_A_JobLV /5) * CardNumSearch(528);
	
	// Hilt Binding Skill#146 - ATK + 4
	n_tok[17] += 4 * SkillSearch(146);

	// Gatling Fever Skill#433 - ATK + 20 + 10 * SkillLV.
	if (n_A_WeaponType==20 && SkillSearch(433))
		n_tok[17] += 20 + 10 * SkillSearch(433);
	// Madness Canceller#420 - ATK + 100
	if(SkillSearch(420))
		n_tok[17] += 100;

	// Peace Breaker#1671 - [Every Refine Level] - ATK + 5
	if (EquipNumSearch(1671))
		n_tok[17] += 5 * n_A_Weapon_ATKplus;

	//[Custom Talon Tales 2018-06-25 - Malangdo Enchantment for Fighting Spirit - ATK] [NattWara]
	// Fighting Spirit n - ATK + n * 2 + 2 with n within [4..8]
	for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];
		if(vME >= 1781 && vME <= 1788)
			n_tok[17] += parseInt(vME.substr(-1)) * 2 + 2;
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for Fighting Spirit - ATK] [NattWara]
	// Fighting Spirit n - ATK + n * 2 + 2 with n within [1..3]
	for(i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
		var vBE = tRO_BiolabWeaponEnchantment[i];
		if(vBE >= 1781 && vBE <= 1788)
			n_tok[17] += parseInt(vBE.substr(-1)) * 2 + 2;
	}
	
	// Rainbow Cake - ATK + 10
	if (n_A_PassSkill7[2])
		n_tok[17] += 10;
	// Box of Resentment - ATK + 20
	if (n_A_PassSkill7[9])
		n_tok[17] += 20;
	// Rune Strawberry Cake - ATK + 5
	if (n_A_PassSkill8[19])
		n_tok[17] += 5;
	// Tasty Pink Ration - ATK + 15
	if (n_A_PassSkill8[31])
		n_tok[17] += 15;
	
	// Snake Encyclopedia#1820 + Sidewinder Card#43 - ATK + 25
	// Snake Encyclopedia#1820 + Snake Card#34 - ATK + 25 and + 5% additional Poison Chance
	// Snake Encyclopedia#1820 + + Anacondaq Card#25 - Increase physical damage on Poison Property enemies by 5% and ignore their defense by 15%
	if (EquipNumSearch(1820))
	{
		snake_cards = CardNumSearch(34);
		anacondaq_cards = CardNumSearch(25);
		sidewinder_cards = CardNumSearch(43);
		
		n_tok[130] += 5 * snake_cards;
		n_tok[45] += 5 * anacondaq_cards;
		n_tok[285] += 15 * anacondaq_cards;
		n_tok[17] += 25 * (snake_cards + sidewinder_cards);
	}
	
	// Antonio's Coat#1728 - [Every Refine Level] ATK & MATK + 1
	if (EquipNumSearch(1728)) {
		n_tok[17] += n_A_BODY_DEF_PLUS;
		n_tok[98] += n_A_BODY_DEF_PLUS;
	}
	
	// Faithful Manager#610
	nb_cards = CardNumSearch(610);
	if (12 == n_A_WeaponType && nb_cards)
	{
		n_tok[17] += 20 * nb_cards; // ATK + 20
		n_tok[10] += 12 * nb_cards; // CRIT + 12
		n_tok[12] += n_A_Weapon_ATKplus * nb_cards; // [Every Refine Level] - ASPD + 1%
	}
	
	// Manage Eden crystal energy buff (stackable)
	eden_crystal_buff_value = (eden_rough_crystal_buff ? 0.5 : 0) + (eden_purified_crystal_buff ? 1 : 0) + (eden_high_crystal_buff ? 1 : 0);
	n_tok[17] += 6 * eden_crystal_buff_value;
	n_tok[98] += 6 * eden_crystal_buff_value;

	n_A_ATK += n_tok[17];

	// Status Change impacting base attack
	
	// Manage [SC_INCATKRATE]
	batk_incatkrate = 1;

	// Venatu's Beep Cocktail - Base ATK Rate + 5% [SC_INCATKRATE]
	if (venatu_beep_cocktail)
		batk_incatkrate = Math.max(batk_incatkrate, 1.05);
	
	// Gospel - Base ATK Rate + 100% [SC_INCATKRATE]
	if (n_A_PassSkill5[3])
		batk_incatkrate = Math.max(batk_incatkrate, 2);
	
	n_A_ATK = Math.floor(n_A_ATK * batk_incatkrate);

	// Manage [SC_PROVOKE] (Applied after SC_INCATKRATE)
	batk_provoke = 1;

	// Aloevera - Provoke Lv 1 effect
	if (n_A_PassSkill2[12])
		batk_provoke = Math.max(batk_provoke, 1.05);

	// Provoke - Base ATK + 2 + SkillLV * 3%
	if (n_A_PassSkill6[5])
		batk_provoke = Math.max(batk_provoke, 1.02 + 0.03 * n_A_PassSkill6[5]);
	
	// Auto Berserk#12 - Provoke Lv 10 effect
	if (SkillSearch(12))
		batk_provoke = Math.max(batk_provoke, 1.32);
		
	n_A_ATK = Math.floor(n_A_ATK * batk_provoke);
	
	// Concentration#256 - Base ATK + SkillLV * 5% (Applied after SC_PROVOKE)
	// Inconsistency with Weapon Attack bonus order
	n_A_ATK = Math.floor((1 + SkillSearch(256) * 0.05) * n_A_ATK);

	// Maiden Hat#1628 - [Every Refine Level Above 6] ATK + 1% (bAddClass bonus)
	n_tok[80] += Math.max(0, n_A_HEAD_DEF_PLUS - 6) * EquipNumSearch(1628);

	// Issue#252 - ATK% in most cases is implementing by bAddClass, All_Class, n insteand of bAtkRate, n

	// Yellow/Green/Pink Sheila Hairnet  - [Loa] - 2016-06-29
	if (EquipNumSearch(1022) || EquipNumSearch(1026) || EquipNumSearch(1073)){
		// [Refine Rate 9+] ATK + 2% 
		if (n_A_HEAD_DEF_PLUS >= 9)
			n_tok[87] += 2;
		// [Refine Rate 10] ATK + 2%
		if (n_A_HEAD_DEF_PLUS == 10)
			n_tok[87] += 2;
	}

	n_A_ATK = Math.floor(n_A_ATK * (1 + n_tok[87] / 100));

	JobHP_A = new Array(0,70,50,40,50,30,40,150,110,75,85,55,90,110,85,90,75,75,75,90,0,150,110,75,85,55,90,110,85,90,75,75,75,90, 0, 0, 0, 0, 0, 0, 0,70,90,75, 75,84);
	JobHP_B = new Array(5, 5, 5, 5, 5, 5, 5,  5,  5, 5, 5, 5, 5,  7, 5,6.5,3, 3, 5, 5,5,  5,  5, 5, 5, 5, 5,  7, 5,6.5,3, 3, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5,6.5, 5, 3, 3.5);


	wHPSL = 0;
	if(n_A_JOB == 43){
		if(n_A_BaseLV >= 70){
			if(n_A_BaseLV <= 79)
				wHPSL = (n_A_BaseLV - 70) *40;
			else if(n_A_BaseLV <= 84)
				wHPSL = (n_A_BaseLV - 80) *50;
			else if(n_A_BaseLV <= 89)
				wHPSL = (n_A_BaseLV - 80) *50 -10;
			else if(n_A_BaseLV <= 92)
				wHPSL = (n_A_BaseLV - 90) *50;
			else if(n_A_BaseLV <= 97)
				wHPSL = (n_A_BaseLV - 90) *50 -10;
			else if(n_A_BaseLV == 98) wHPSL = 375;
			else wHPSL = 4;
		}
	}

	w = 0;
	for(i=2;i<=n_A_BaseLV;i++){
		w += Math.round(JobHP_A[n_A_JOB] * i /100);
	}

	n_A_MaxHP = Math.floor((JobHP_B[n_A_JOB] * n_A_BaseLV) + 35 + w);


	if(n_A_JOB == 44){
		NinHP = new Array(131,137,144,151,159,167,175,184,193,202,212,222,232,243,254,265,277,289,301,316,331,346,364,382,400,420,440,460,482,504,526,548,572,596,620,646,672,698,726,754,784,814,844,876,908,940,975,1010,1100,1140,1180,1220,1260,1300,1340,1385,1430,1475,1520,1565,1615,1665,1715,1765,1815,1880,1935,1990,2045,2100,2160,2200,2280,2340,2400,2460,2520,2580,2640,2705,2770,2835,2900,2965,3030,3100,3170,3240,3310,3380,3455,3530,3605,3680,3760,3840,3920,4000,4080);
		n_A_MaxHP = NinHP[n_A_BaseLV-1];
	}

	if(n_A_JOB == 45 && n_A_BaseLV >= 10){
		GunHP = new Array(202,212,222,232,243,254,265,277,289,301,316,331,346,364,382,400,420,440,460,490,520,550,580,610,650,680,710,740,770,800,830,860,890,920,950,990,1020,1050,1080,1110,1140,1180,1230,1280,1330,1395,1455,1515,1575,1635,1695,1760,1820,1885,1950,2015,2080,2145,2210,2275,2340,2410,2480,2550,2620,2690,2760,2830,2900,2970,3040,3115,3190,3265,3340,3415,3490,3565,3640,3715,3790,3870,3950,4030,4110,4190,4270,4350,4430,4510);
		n_A_MaxHP = GunHP[n_A_BaseLV-10];
	}

	if(n_A_JOB == 20 && n_A_BaseLV == 99)
		n_A_MaxHP += 2000;

	if(n_Tensei) // Trans job health bonus
		n_A_MaxHP = n_A_MaxHP * 1.25;
	//if(eval(A_youshi.checked)) n_A_MaxHP = n_A_MaxHP * 0.7; Currently not applied on rAthena
	n_A_MaxHP = (n_A_MaxHP - wHPSL) * (100 + n_A_VIT) / 100;


	if(n_A_JOB == 41 && n_A_BaseLV >= 70){
		if(n_A_BaseLV <=79)
			n_A_MaxHP = Math.floor((2127 + 10 * (n_A_BaseLV-70)) * (100 + n_A_VIT) / 100);
		else if(n_A_BaseLV <=89)
			n_A_MaxHP = Math.floor((2200 + 50 * (n_A_BaseLV-80)) * (100 + n_A_VIT) / 100);
		else if(n_A_BaseLV <=99){
			n_A_MaxHP = (2700 + 50 * (n_A_BaseLV-90)) * (100 + n_A_VIT) / 100;
			if(SkillSearch(345))
				n_A_MaxHP = n_A_MaxHP * 3;
			n_A_MaxHP = n_A_MaxHP;
		}
	}

	if(n_A_JOB == 42 && n_A_BaseLV >= 70){
		wKenseiHP = [3455,3524,3593,3663,3834,3806,3878,3951,4025,4500];
		if(n_A_BaseLV <=79)
			n_A_MaxHP = (2670 + 10 * (n_A_BaseLV-70)) * (100 + n_A_VIT) / 100;
		else if(n_A_BaseLV <=89)
			n_A_MaxHP = (3000 + 20 * (n_A_BaseLV-80)) * (100 + n_A_VIT) / 100;
		else if(n_A_BaseLV <=99)
			n_A_MaxHP = wKenseiHP[n_A_BaseLV-90] * (100 + n_A_VIT) / 100;
	}

	//[Custom Talon Tales 2018-06-02 - Advanced Fin Helm Gives Maximum HP + 6 * Base Level] [Kato]
	if(EquipNumSearch(1561)) {
		n_tok[13] += 6 * n_A_BaseLV;
	}

	n_tok[13] += SkillSearch(156) * 200; // Faith#156
	
	// Jejeling card#561 - MaxHP + 200 * Base VIT / 10 
	n_tok[13] += 200 * Math.floor(SU_VIT/10) * CardNumSearch(561);

	if(n_A_BODY_DEF_PLUS >= 9 && CardNumSearch(225))
		n_tok[13] += 800;
	if(CardNumSearch(186))
		n_tok[13] -= 40 * n_A_BODY_DEF_PLUS;
	if(EquipNumSearch(836))
		n_tok[13] += n_A_BaseLV *10;
	if(n_A_Equip[8]==536){
		wHPVS = n_A_JobSearch();
		if(wHPVS==3 || wHPVS==4 || wHPVS==5)
			n_tok[13] += 5 * n_A_BaseLV;
	}
	if(n_A_JobSearch()==5)
		n_tok[13] += CardNumSearch(474) * -100;
	if(n_A_JobSearch()==1)
		n_tok[13] += 500 * CardNumSearch(477);
	if(EquipNumSearch(883) && n_A_BaseLV <= 79)
		n_tok[13] += 400 * EquipNumSearch(883);
	if(EquipNumSearch(1116) && n_A_JobSearch()==0)
		n_tok[13] += 60;
	if(EquipNumSearch(986))
		n_tok[13] += 7 * n_A_BaseLV;
	if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1168))
		n_tok[13] -= 200;
	//custom Talon Tales Chronos fix, +50 HP instead of SP each 2 refine levels
	if(EquipNumSearch(1172))
		n_tok[13] += 50 * Math.floor(n_A_Weapon_ATKplus / 2);
	//custom Talon Tales Fancy Phantom Mask, +100 HP instead of SP each refine
	if(EquipNumSearch(1487))
		n_tok[13] += 100 * n_A_HEAD_DEF_PLUS;
	//custom Talon Tales Geffenia Water Book, +800 HP if base INT is 99
	if(EquipNumSearch(1520) && SU_INT == 99)
		n_tok[13] += 800;
	//custom Talon Tales Kris enchant HP
	var KEbonus = [A_KE11.value,A_KE12.value,A_KE21.value,A_KE22.value];
	for (i=0;i<KEbonus.length;i++){
		var wKE = KEbonus[i];
		if(wKE){
			if(131 <= wKE && wKE <= 139){
				n_tok[13] += parseInt(wKE.substr(-1)) * 100;
			}
		}
	}

	//tiraya bonnet + 20hp per refine - [Loa] 2018-07-02
	if(EquipNumSearch(1048)){
		n_tok[13] += n_A_HEAD_DEF_PLUS * 20;
	}
  //[Talon Tales Custom - Glorious Huuma Shuriken - + 150 HP per refine level] [Amor]
	if(EquipNumSearch(1098)) {
		n_tok[13] += (150 * n_A_Weapon_ATKplus);
	}
	//[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for MaxHP] [Kato]
	for(i=0;i<tRO_MalangdoEnchantment.length;i++) {
		var vME = tRO_MalangdoEnchantment[i];
			if(vME >= 131 && vME <= 133) {
					n_tok[13] += parseInt(vME.substr(-1)) * 100;
			}
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Armor Enchantment for MaxHP] [NattWara]
	for(i=0;i<tRO_BiolabArmorEnchantment.length;i++) {
		var vBE = tRO_BiolabArmorEnchantment[i];
			if(vBE >= 131 && vBE <= 133) {
					n_tok[13] += parseInt(vBE.substr(-1)) * 100;
			}
	}

	// Glorious Holy Avenger#1079
	if (EquipNumSearch(1079))
	{
		/*
			[Refine Rate 7~10]
			MaxHP +1000
			Ignore 20% of Player MDEF.
			Reduce SP consumption of skills by 10%.
			Increase magic damage against Players by 15%.
		*/
		if (n_A_Weapon_ATKplus >= 7)
		{
			n_tok[13] += 1000;
			n_tok[72] -= 10;
			n_tok[177] += 15;
			n_tok[317] += 20;
		}
	}

	// Apply flat MaxHP Bonus
	n_A_MaxHP += n_tok[13];
	n_A_MaxHP = Math.max(n_A_MaxHP, 1);

	if(SU_VIT >= 80 && CardNumSearch(267))
		n_tok[15] += 3;

	if(CardNumSearch(405)){
		if(n_A_JobSearch()==1 || n_A_JobSearch()==2 || n_A_JobSearch()==6)
			n_tok[15] += 5;
	}
	if(n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(304))
		n_tok[15] += 10;
	if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407))
		n_tok[15] += 4;
	if(n_A_PassSkill5[1])
		n_tok[15] += 100;
	if(EquipNumSearch(715))
		n_tok[15] -= n_A_SHOES_DEF_PLUS;
	if (n_A_PassSkill3[3]) // Apple of Idun - HP Rate: (5 + 2 * skill_lv) + (VIT / 10) + (BA_MUSICALLESSON skill_lv / 2)
	{
		// Electric Guitar1381#8th Bonus - [The Apple of Idun] MaxHP Rate + 1% for every skill level. Heals three times as often and as much
		apple_of_idun_sqi_bonus = ((1381 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 8) > -1) || apple_bonus) ? 2 : 1;
		n_tok[15] += 5 + apple_of_idun_sqi_bonus * n_A_PassSkill3[3] * 2 + Math.floor(n_A_PassSkill3[23] /10) + Math.floor(n_A_PassSkill3[33]) / 2;
	}

	//Custom Talon Tales - 2018-06-07 - Enhanced Corsair [1] - +1% MaxHP for refine 5 to 7 (total +3%), +2% MaxHP if refine 8+ [Nattwara]
	if(EquipNumSearch(1657)){
		if(n_A_HEAD_DEF_PLUS>4)
			n_tok[15] += 1;

		if(n_A_HEAD_DEF_PLUS>5)
			n_tok[15] += 1;

		if(n_A_HEAD_DEF_PLUS>6)
			n_tok[15] += 1;

		if(n_A_HEAD_DEF_PLUS>7)
			n_tok[15] += 2;
	}

	//Bungisngis Card - hp 1% after lvl 5 refine
	if(CardNumSearch(554) && n_A_card[8] == 554) {
		if(n_A_HEAD_DEF_PLUS > 5){
			n_tok[15] += n_A_HEAD_DEF_PLUS-5;
		}
	}

	// Sleeper's Dream Cocktail - MaxHP + 5%
	if (sleeper_dream_cocktail)
		n_tok[15] += 5;

	//custom Talon Tales Lady Tanee Card: +1% HP per 8 base AGI
	if(CardNumSearch(409))
		n_tok[15] += Math.floor(SU_AGI / 8);
	if(SU_VIT >= 80 && EquipNumSearch(1526))
		n_tok[15] += 5;

	//[Custom Talon Tales - Deviruchi Headphones (1426) -1% MHP] [Kato]
	if(EquipNumSearch(1426))
		n_tok[15] -= 1;

	// Valorous Insane Battle Axe#905 - [Refine level 8-10] - MaxHP + 10%
	if (EquipNumSearch(905) && n_A_Weapon_ATKplus >= 8)
		n_tok[15] += 10;

	// Manage Deluge MaxHP% bonus if [Water] armor is equipped
	if(n_A_PassSkill6[0] == 1 && n_A_PassSkill6[1] && n_A_BodyZokusei == 1)
	{
		deluge_HP_bonus = [5,9,12,14,15];
		n_tok[15] += deluge_HP_bonus[n_A_PassSkill6[1] - 1];
	}
	
	n_A_MaxHP = Math.floor(n_A_MaxHP * (100 + n_tok[15]) / 100);
	
	// Berserk#258 MaxHP*3 in Talon Tales while part of n_tok[15] with 200% bonus in rAthena
	if (SkillSearch(258))
		n_A_MaxHP *= 3;

	if(n_A_MaxHP>=100){
		if(n_A_MaxHP>=10000)
			myInnerHtml("A_MaxHP"," "+n_A_MaxHP,0);
		else
			myInnerHtml("A_MaxHP",n_A_MaxHP,0);
	}
	else
		myInnerHtml("A_MaxHP"," "+n_A_MaxHP,0);

	JobSP_A = new Array(1,2,2,5,2,6,3,3,4,8,4,9,4,4.7,5,4.7,6,6,7,4,1,3,4,8,4,9,4,4.7,5,4.7,6,6,7,4,0,0,0,0,0,0,0,2,4.7,9,3.75,3.75);


	wSPSL = 0;
	if(n_A_JOB == 43){
		if(n_A_BaseLV >= 70){
			if(n_A_BaseLV < 80)
				wSPSL = (n_A_BaseLV - 70) *4 +5;
			else if(n_A_BaseLV < 90)
				wSPSL = (n_A_BaseLV - 80) *4;
			else if(n_A_BaseLV < 93)
				wSPSL = (n_A_BaseLV - 90) *4;
			else if(n_A_BaseLV < 99)
				wSPSL = (n_A_BaseLV - 90) *4 -10;
			else wSPSL = 1;
		}
	}

	n_A_MaxSP = Math.floor(10 + n_A_BaseLV * JobSP_A[n_A_JOB] - wSPSL);

	if(n_A_JOB == 44){
		if(n_A_BaseLV <= 20) n_A_MaxSP = 11 + n_A_BaseLV * 3;
		else if(n_A_BaseLV <= 40) n_A_MaxSP = 71 +(n_A_BaseLV-20)*4;
		else if(n_A_BaseLV <= 60) n_A_MaxSP = 151 +(n_A_BaseLV-40)*5;
		else if(n_A_BaseLV <= 80) n_A_MaxSP = 251 +(n_A_BaseLV-60)*6;
		else n_A_MaxSP = 370 +(n_A_BaseLV-80)*8;
	}

	if(n_A_JOB == 45){
		if(n_A_BaseLV <= 25) n_A_MaxSP = 10 + n_A_BaseLV * 3;
		else if(n_A_BaseLV <= 35) n_A_MaxSP = 85 +(n_A_BaseLV-25)*4;
		else if(n_A_BaseLV <= 40) n_A_MaxSP = 126 +(n_A_BaseLV-35)*3;
		else if(n_A_BaseLV <= 50) n_A_MaxSP = 141 +(n_A_BaseLV-40)*4;
		else if(n_A_BaseLV <= 75) n_A_MaxSP = 181 +(n_A_BaseLV-50)*5;
		else if(n_A_BaseLV <= 78) n_A_MaxSP = 306 +(n_A_BaseLV-75)*6;
		else n_A_MaxSP = 330 +(n_A_BaseLV-78)*6;
	}
	
	n_A_MaxSP = Math.floor(n_A_MaxSP * (100 + n_A_INT) * (n_Tensei ? 1.25 : 1) / 100);

	if(n_A_JOB == 41 && n_A_BaseLV >= 70){
		if(n_A_BaseLV <=79)
			n_A_MaxSP = Math.floor((150 + 1 * (n_A_BaseLV-70)) * (100 + n_A_INT) / 100);
		else if(n_A_BaseLV <=89)
			n_A_MaxSP = Math.floor((160 + 1 * (n_A_BaseLV-70)) * (100 + n_A_INT) / 100);
		else if(n_A_BaseLV <=99){
			n_A_MaxSP = 190 * (100 + n_A_INT) / 100;
			if(SkillSearch(345))
				n_A_MaxSP = n_A_MaxSP * 3;
			n_A_MaxSP = Math.floor(n_A_MaxSP);
		}
	}

	if(n_A_JOB == 42 && n_A_BaseLV >= 70){
		if(n_A_BaseLV <=79)
			n_A_MaxSP = Math.floor((339 + 2 * (n_A_BaseLV-70)) * (100 + n_A_INT) / 100);
		else if(n_A_BaseLV <=89)
			n_A_MaxSP = Math.floor((386 + 2 * (n_A_BaseLV-80)) * (100 + n_A_INT) / 100);
		else if(n_A_BaseLV <=99)
			n_A_MaxSP = Math.floor((430 + 3 * (n_A_BaseLV-90)) * (100 + n_A_INT) / 100);
	}

	w=0;

	w += n_tok[14];
	//w += StPlusCalc2(4); adds +1 sp for every equip based int - which is wrong
	//w += StPlusCalc2(7); adds +1 sp for every equip based int - which is wrong (7=all stats, so 7,3=all stats +3)
	if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[8] == 298)
		w += 150;
	if(n_A_HEAD_DEF_PLUS <= 4 && n_A_card[8]==179)
		w += 40;
	if(n_A_card[9]==179)
		w += 40;
	if(n_A_card[16]==179)
		w += 40;
	if(n_A_card[17]==179)
		w += 40;
	if(n_A_card[18]==179)
		w += 40;
	if(n_A_JobSearch()==5)
		w += 100 * CardNumSearch(474);
	if(n_A_JobSearch()==5)
		w += 100 * CardNumSearch(476);

	if(SkillSearch(372))
		w += 30 * SkillSearch(372);
	if(n_A_Equip[8]==536){
		wSPVS = n_A_JobSearch();
		if(wSPVS==1 || wSPVS==2 || wSPVS==6)
			w += 2 * n_A_JobLV;
	}
	if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(642))
		w += 300;
	if(EquipNumSearch(883) && n_A_BaseLV <= 79)
		w += 200 * EquipNumSearch(883);
	if(EquipNumSearch(1118) && n_A_JobSearch()==3)
		w += 50;
	if(EquipNumSearch(986))
		w += Math.floor(0.5 * n_A_BaseLV);
	if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1168))
		w -= 100;
	if(EquipNumSearch(1193))
		w += Math.floor(n_A_BaseLV / 3) + n_A_SHOULDER_DEF_PLUS * 10;
	//custom Talon Tales Improved Magician Hat: Every refine level adds Maximum SP + 5 - [Loa] - 2018-06-07
	if(EquipNumSearch(1646)){
		w += n_A_HEAD_DEF_PLUS * 5;
	}

	// Pitch Dark Evil Druid Hat#1714 - [For every refine] MDEF + 1
	n_tok[19] += n_A_HEAD_DEF_PLUS * EquipNumSearch(1715);
	
	// Red Dress Hat#1833 - [For 2 every refines] MDEF + 1
	n_tok[19] += Math.floor(n_A_HEAD_DEF_PLUS/2) * EquipNumSearch(1833);
	
	//Red Minstrel Hat [For Every Refine > 5] MDEF + 1, MSP + 10 - [Loa] - 2018-07-03
	if(EquipNumSearch(1139) && n_A_HEAD_DEF_PLUS > 5){
		w += (n_A_HEAD_DEF_PLUS - 5) * 10;
		n_tok[19] += n_A_HEAD_DEF_PLUS - 5;
	}
	//custom Talon Tales Kris enchant SP
	var KEbonus = [A_KE11.value,A_KE12.value,A_KE21.value,A_KE22.value];
	for (i=0;i<KEbonus.length;i++){
		var wKE = KEbonus[i];
		if(wKE){
			if(141 <= wKE && wKE <= 149){
				w += parseInt(wKE.substr(-1)) * 50;
			}
		}
	}
	//[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for MaxSP] [Kato]
	for(i=0;i<tRO_MalangdoEnchantment.length;i++) {
		var vME = tRO_MalangdoEnchantment[i];
			if(vME == 141 || vME == 142) {
					w += parseInt(vME.substr(-1)) * 50;
			}
	}
	//[Custom Talon Tales 2018-07-10 - Biolab Armor Enchantment for MaxSP] [NattWara]
	for(i=0;i<tRO_BiolabArmorEnchantment.length;i++) {
		var vBE = tRO_BiolabArmorEnchantment[i];
			if(vBE == 141) {
					w += 50;
			}
	}
	n_A_MaxSP += w;

	if(n_A_MaxSP < 0)
		n_A_MaxSP = 0;

	w=0;

	// Mobster's Paradise Cocktail - MaxSP + 5%
	if (mobster_paradise_cocktail)
		n_tok[16] += 5;

	/*
		Service for you - n_A_PassSkill3[6]
		Increase max SP and SP regeneration while reducing the SP consumption of all players within the area of effect.
		SP consumption reduction is affected by the Dancer's INT / 10 and level of Dance Lessons / 2.
	*/
	if(n_A_PassSkill3[6])
	{
		n_tok[72] -= 20 + 3 * n_A_PassSkill3[6] + Math.floor(n_A_PassSkill3[36] / 2) + Math.floor(n_A_PassSkill3[26] / 10);
		n_tok[16] += 15 + n_A_PassSkill3[6] + Math.floor(n_A_PassSkill3[36] / 2) + Math.floor(n_A_PassSkill3[26] /10);
	}

	w += n_tok[16];
	if(n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(304))
		w += 10;
	if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407))
		w += 4;

	//Bungisngis Card - sp 1% after lvl 5 refine
	if(CardNumSearch(554) && n_A_card[8] == 554) {
		if(n_A_HEAD_DEF_PLUS > 5){
			w += 1*(n_A_HEAD_DEF_PLUS-5);
		}
	}

	if(CardNumSearch(405)){
		if(n_A_JobSearch()==3 || n_A_JobSearch()==4 || n_A_JobSearch()==5)
			w += 5;
	}
	w += SkillSearch(269);

	w += SkillSearch(274) *2;

	if(EquipNumSearch(715))
		w -= n_A_SHOES_DEF_PLUS;
	
	n_A_MaxSP = Math.floor(n_A_MaxSP * (100 + w)/100);

	if(n_A_MaxSP >= 100)
		myInnerHtml("A_MaxSP",n_A_MaxSP,0);
	else
		myInnerHtml("A_MaxSP"," "+n_A_MaxSP,0);

	n_A_DEF = n_tok[18];
	n_A_DEF2 = n_A_VIT;

	for(i=2;i<=10;i++)
	{
		n_A_DEF += ItemOBJ[n_A_Equip[i]][3];
	}
	if(EquipNumSearch(1026))
		n_A_DEF -= 5;
	if(n_A_LEFT_DEF_PLUS <= 5 && CardNumSearch(222))
		n_A_DEF += 2;
	if(n_A_BODY_DEF_PLUS <= 5 && CardNumSearch(283))
		n_A_DEF += 2;
	if(n_A_Equip[0]==521){
		if(n_A_Weapon_ATKplus <= 5)
			n_A_DEF += 2;
		else if(n_A_Weapon_ATKplus >= 9)
			n_A_DEF += 7;
		else
			n_A_DEF += 5;
	}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1272)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1273)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1274)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1275)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1276)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1280)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1282)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1286)){n_A_DEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1287)){n_A_DEF += 1;}
	if(EquipNumSearch(658))
		n_A_DEF += n_A_Weapon_ATKplus;
	if(EquipNumSearch(715))
		n_A_DEF += Math.floor(n_A_SHOES_DEF_PLUS /2);
	if(EquipNumSearch(742) && n_A_JobSearch()==1)
		n_A_DEF += 6;
	if(EquipNumSearch(942))
		n_A_DEF += Math.floor(n_A_Weapon_ATKplus / 2);;
	if(EquipNumSearch(986) && (n_A_JobSearch()==1 || n_A_JobSearch()==2 || n_A_JobSearch()==6))
		n_A_DEF += 3;
	if(EquipNumSearch(987) && (EquipNumSearch(616) || EquipNumSearch(617) || EquipNumSearch(618)))
		n_A_DEF += 2;
	if(EquipNumSearch(1117) && n_A_JobSearch()==1)

		n_A_DEF += 2;

	if(n_A_PassSkill3[9])
		n_A_DEF += 2 + 2 * n_A_PassSkill3[9];

	if(EquipNumSearch(764))
		n_A_DEF -= (n_A_HEAD_DEF_PLUS + n_A_LEFT_DEF_PLUS);
	if(EquipNumSearch(809))
		n_A_DEFplus -= n_A_HEAD_DEF_PLUS;

	//custom Talon Tales Advanced Safety Ring: Every 30 VIT reduces DEF by 1 - [Loa] - 2016-06-07
	if(EquipNumSearch(1641)){
		n_A_DEF -= EquipNumSearch(1641) * Math.floor(SU_VIT / 30);
	}

	//Custom Talon Tales - 2018-06-07 - Enhanced Bone Helm [1] - +1 DEF each refine past +4 until +8 [Nattwara/Loa]
	if(EquipNumSearch(1656) && n_A_HEAD_DEF_PLUS > 4)
		n_A_DEFplus -= Math.min(n_A_HEAD_DEF_PLUS-4,4);

	//custom Talon Tales Armor enchant DEF
	var wHSE = A_HSE.value;
	if(wHSE){
		if(101 <= wHSE && wHSE <= 109)
			n_A_DEF += parseInt(wHSE.substr(-1));
	}
	//custom Talon Tales Kris enchant DEF
	var KEbonus = [document.calcForm.A_KE11.value,document.calcForm.A_KE12.value,document.calcForm.A_KE21.value,document.calcForm.A_KE22.value];
	for (i=0;i<KEbonus.length;i++){
		var wKE = KEbonus[i];
		if(wKE){
			if(101 <= wKE && wKE <= 109){
				n_A_DEF += parseInt(wKE.substr(-1));
			}
		}
	}
	//[Custom Talon Tales 2018-07-10 - Biolab Armor Enchantment for DEF] [NattWara]
	for(i=0;i<tRO_BiolabArmorEnchantment.length;i++) {
		var vBE = tRO_BiolabArmorEnchantment[i];
			if(vBE >= 101 && vBE <= 102) {
					n_A_DEF += parseInt(vBE.substr(-1));
			}
	}
	/*
		Soldier Shotgun
		[Refine level 6-10]
		DEF + 5
	*/
	if (EquipNumSearch(928) && n_A_Weapon_ATKplus >= 6) {
		n_A_DEF += 5;
	}
	/*
		Glorious Shotgun
		[Refine level 8-10]
		DEF + 5
	*/
	if (EquipNumSearch(1102) && n_A_Weapon_ATKplus >= 8) {
		n_A_DEF += 5;
	}

	// Apply refine bonus before status changes
	n_A_DEF += Math.round(n_A_DEFplus * 0.66);

	if (n_tok[24])
	{
		n_A_DEF = Math.floor(n_A_DEF / n_tok[24]);
		n_A_DEF2 = Math.floor(n_A_DEF2 / n_tok[24]);
	}

	if (n_tok[85])
		n_A_DEF -= Math.floor(n_A_DEF * n_tok[85] /100);

	if (SkillSearch(258)) // Berserk#258
	{
		n_A_DEF = 0;
		n_A_DEF2 = 0;
	}

	if (SkillSearch(256)) // Concentration#256
	{
		n_A_DEF = Math.floor(n_A_DEF * (1 - 0.05 * SkillSearch(256)));
		n_A_DEF2 = Math.floor(n_A_DEF2 * (1 - 0.05 * SkillSearch(256)));
	}

	if (n_A_IJYOU[2]) // Poisoned Status
	{
		n_A_DEF = Math.floor(n_A_DEF * 0.75);
		n_A_DEF2 = Math.floor(n_A_DEF2 * 0.75);
	}
	
	if (n_A_PassSkill5[5]) // Gospel DEF+25%
		n_A_DEF += Math.floor(n_A_DEF * .25);
	
	//def reduction when mobbed updated [Loa] 2018-07-24
	defReduc = Math.min(1, (n_A_PassSkill8[12] + (n_A_PassSkill8[33] * 2) + (n_A_PassSkill8[34] * 3)) * 3 / 100);
	n_A_DEF = Math.floor(n_A_DEF * (1 - defReduc));

	if (SkillSearch(196)) // Steel Body#196 not affected by def reduction
		n_A_DEF = 90;

	if(SkillSearch(12)) // Auto Berserk#12
		n_A_DEF2 = Math.floor(n_A_DEF2 * 0.45);

	if (n_A_PassSkill2[12]) // Aloevera
		n_A_DEF2 = Math.floor(n_A_DEF2 * 0.9);

	if (n_A_PassSkill6[5]) // Provoke
		n_A_DEF2 = Math.floor(n_A_DEF2 * (0.95 - 0.05 * n_A_PassSkill6[5]));

	//[Grimtooth also reduces Vit Def by 1/2] [Kato]
	if (EquipNumSearch(15))
		n_A_DEF2 -= Math.floor(n_A_DEF2 * .50);

	//[Masamune also reduces Vit Def by 1/3] [Kato]
	if (EquipNumSearch(47))
		n_A_DEF2 -= Math.floor(n_A_DEF2 * .67);

	//[Spike 0/2 also reduces Vit Def by 1/3] [Kato]
	if (EquipNumSearch(420))
		n_A_DEF2 -= Math.floor(n_A_DEF2 * .67);

	// Angelus
	n_A_DEF2 = Math.floor(n_A_DEF2 * (1 + 0.05 * n_A_PassSkill2[4]));

	myInnerHtml("A_totalDEF", n_A_DEF + "+" + n_A_DEF2, 0);
	
	// VITDEF is different than DEF2, as the reduced damage from DEF2 is not a fixed value hence represented by VITDEF
	n_A_VITDEF = new Array();
	n_A_VITDEF[0] = Math.floor(n_A_DEF2 * 0.5) + Math.floor(n_A_DEF2 * 0.3);
	n_A_VITDEF[2] = Math.floor(n_A_DEF2 * 0.5) + Math.floor(n_A_DEF2 * n_A_DEF2 / 150) -1;
	if(n_A_VITDEF[2] > n_A_VITDEF[0]){
		n_A_VITDEF[1] = (n_A_VITDEF[0] + n_A_VITDEF[2]) / 2;
	}
	else{
		n_A_VITDEF[1] = n_A_VITDEF[0];
		n_A_VITDEF[2] = n_A_VITDEF[0];
	}

	//soft def reduction when mobbed updated [Loa] 2081-08-11
	if (!SkillSearch(196)) // Steel Body#196 not affected by vit def reduction
	{
		for (i = 0; i <= 2;i++)
			n_A_VITDEF[i] = Math.floor(n_A_VITDEF[i] * (1 - defReduc));
	}

	// Menblatt Wing Manteau#1696 [Every 2 Refine Level] MDEF + 1
	if (EquipNumSearch(1696))
		n_tok[19] += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	
	// MDEF armor enchant
	var wHSE = A_HSE.value;
	if (wHSE){
		if (111 <= wHSE && wHSE <= 119)
			n_tok[19] += parseInt(wHSE.substr(-1));
	}

	// Red Stocking Boots#1730 - [Every Refine Level] MDEF + 1
	n_tok[19] += n_A_SHOES_DEF_PLUS * EquipNumSearch(1730);

	n_A_MDEF = n_tok[19];

	if(EquipNumSearch(986) && (n_A_JobSearch()==3 || n_A_JobSearch()==4 || n_A_JobSearch()==5))
		n_A_MDEF += 5;

	if(n_A_JobSearch()==3)
		n_A_MDEF += CardNumSearch(383);
	if(n_A_HEAD_DEF_PLUS <= 5 && n_A_card[8] == 213)
		n_A_MDEF += 5;
	if(n_A_card[9] == 213)
		n_A_MDEF += 5;
	if(n_A_card[16] == 213)
		n_A_MDEF += 5;
	if(n_A_card[17] == 213)
		n_A_MDEF += 5;
	if(n_A_card[18] == 213)
		n_A_MDEF += 5;
	if(n_A_LEFT_DEF_PLUS <= 5 && CardNumSearch(222))
		n_A_MDEF += 3;
	if(n_A_BODY_DEF_PLUS <= 5 && CardNumSearch(283))
		n_A_MDEF += 5;
	if(n_A_SHOES_DEF_PLUS <= 5 && CardNumSearch(381))
		n_A_MDEF += 7;
	if(n_A_SHOULDER_DEF_PLUS <= 5 && CardNumSearch(258))
		n_A_MDEF += 8;
	if(EquipNumSearch(764))
		n_A_MDEF += (n_A_HEAD_DEF_PLUS + n_A_LEFT_DEF_PLUS);

	//Custom Talon Tales - 2018-06-07 - Enhanced Helm of Angel [1] - MDEF Part [Nattwara]
	/*
	[Refine Rate 5+]
	AGI + 1, LUK + 1, MDEF + 1
	[Refine Rate 6+]
	AGI + 1, LUK + 1, MDEF + 1
	*/
	if(EquipNumSearch(1655)){
		if(n_A_HEAD_DEF_PLUS>4){
			n_A_MDEF += 1;
		}
		if(n_A_HEAD_DEF_PLUS>5){
			n_A_MDEF += 1;
		}
	}

	if(EquipNumSearch(809))
		n_A_MDEF += n_A_HEAD_DEF_PLUS;
	if(CardNumSearch(199) && n_A_JobSearch()==5)
		n_A_MDEF += 3;
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1277)){n_A_MDEF += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1281)){n_A_MDEF += 7;}

	if (!CardNumSearch(95))
	{
		if (SkillSearch(9))
			n_A_MDEF += SkillSearch(9);
		else if (SkillSearch(256))
			n_A_MDEF += 1;
	}

	//custom Talon Tales Kris enchant MDEF
	var KEbonus = [document.calcForm.A_KE11.value,document.calcForm.A_KE12.value,document.calcForm.A_KE21.value,document.calcForm.A_KE22.value];
	for (i=0;i<KEbonus.length;i++){
		var wKE = KEbonus[i];
		if(wKE){
			if(111 <= wKE && wKE <= 119){
				n_A_MDEF += parseInt(wKE.substr(-1));
			}
		}
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Armor Enchantment for MDEF] [NattWara]
	for(i=0;i<tRO_BiolabArmorEnchantment.length;i++) {
		var vBE = tRO_BiolabArmorEnchantment[i];
			if(vBE >= 111 && vBE <= 114) {
					n_A_MDEF += parseInt(vBE.substr(-1));
			}
	}

	//[Custom Talon Tales 2018-07-12 - Eden Armor Enchantment for MDEF] [NattWara]
	for(i=0; i < tRO_EdenArmorEnchantment.length; i++) {
		var vEE = tRO_EdenArmorEnchantment[i];
		if(111 <= vEE && vEE <= 119) {
			var val = parseInt(vEE.substr(-1));
			n_A_MDEF += val;
		}
	}

	//custom Talon Tales Nightmare Bangungot Boots
	if(EquipNumSearch(1544) || EquipNumSearch(1014)){
		n_A_MDEF += n_A_SHOES_DEF_PLUS;
	}

	//custom Talon Tales Alnoldi Card: +5 MDEF if refined above +9
	if(n_A_LEFT_DEF_PLUS >= 9 && CardNumSearch(518))
		n_A_MDEF += 5;

	if(SkillSearch(196))
		n_A_MDEF = 90;

	if((n_A_JOB != 1 && n_A_JOB != 7 && n_A_JOB != 13 && n_A_JOB != 21 && n_A_JOB != 27 && n_A_JOB != 35) && n_A_MDEF >= 99){
		n_A_MDEF = 99;}

	if(SkillSearch(258)){
		myInnerHtml("A_MDEF",0 + "+" + 0 + "<br><b>WOE: </b>" + 0 + "+" + 0,0);
	}else{
		myInnerHtml("A_MDEF",n_A_MDEF + "+" + n_A_INT + "<br><b>WOE: </b>" + n_A_MDEF + "+" + Math.floor((n_A_VIT/2)+n_A_INT),0);}

	n_A_INTMDEF = n_A_INT + Math.floor(n_A_VIT / 2);
	if(TimeItemNumSearch(9))
		n_A_INTMDEF -= Math.floor(n_A_INTMDEF * 20 / 100);

	n_A_HIT = n_A_BaseLV + n_A_DEX;
	
	// Enforcer Cape#1699 [Every Refine Level] HIT + 1
	// Enforcer Shoes#1700 [Every Refine Level] HIT + 1
	n_tok[8] += n_A_SHOULDER_DEF_PLUS * EquipNumSearch(1699) + n_A_SHOES_DEF_PLUS * EquipNumSearch(1700);

	// Antonio's Coat + Antonio's Red Bag Combo#1732 [Every Refine Level] of Garment - HIT + 1
	n_tok[8] += n_A_SHOULDER_DEF_PLUS * EquipNumSearch(1732);

	// Spoon#1738 [Every Refine Level] - HIT + 3
	n_tok[8] += n_A_Weapon_ATKplus * 3 * EquipNumSearch(1738);
	
	// Death Fire#1791 [Every Refine Level] - HIT + 4
	n_tok[8] += n_A_Weapon_ATKplus * 4 * EquipNumSearch(1791);

	n_A_HIT += n_tok[8];

	// //negative hit correction- [Loa] - 2018-06-18
	// if(n_A_HIT < 0){
	// 	n_A_HIT -= n_A_HIT;
	// }

	if(EquipNumSearch(656))
		n_A_HIT -= Math.floor(SU_DEX / 3);
	if(n_A_WeaponType==3 || n_A_WeaponType==2)
		n_A_HIT += CardNumSearch(464) * 5;
	if(n_A_WeaponType==10)
		n_A_HIT += CardNumSearch(465) * 5;
	if(CardNumSearch(492))
		n_A_HIT += Math.floor(n_A_JobLV /5) * CardNumSearch(492); //custom Talon Tales Ifrit Card +1hit every 5 Joblv
		//n_A_HIT += Math.floor(n_A_JobLV /10) * CardNumSearch(492); //custom Talon Tales Ifrit Card +1hit every 5 Joblv


	if(SU_STR >= 90 && EquipNumSearch(442))
		n_A_HIT += 10 * EquipNumSearch(442);
	if(SU_STR >= 95 && EquipNumSearch(1167))
		n_A_HIT += 10;
	if(EquipNumSearch(1176) && SkillSearch(81) == 10)
		n_A_HIT += 10;
	if(EquipNumSearch(1005)& EquipNumSearch(442))
		n_A_HIT += (n_A_Weapon_ATKplus/2);

	n_A_HIT += 1 * SkillSearch(39);
	n_A_HIT += 2 * SkillSearch(148);
	n_A_HIT += 3 * SkillSearch(270);

	n_A_HIT += 10 * SkillSearch(256);
	n_A_HIT += 1 * SkillSearch(426);
	if(SkillSearch(421))
		n_A_HIT -= 30;
	if(SkillSearch(422))
		n_A_HIT += 20;
	n_A_HIT += 2 * SkillSearch(425);

	if(EquipNumSearch(654))
		n_A_HIT += Math.floor(SU_AGI / 10);

	/*
		ZoneSoldier - 2018-06-06
		Add 1 HIT for every 2 LUK.
	*/
	if(EquipNumSearch(1627)){
		n_A_HIT += Math.floor(SU_LUK / 2);
	}

	if(n_A_ActiveSkill==324)
		n_A_HIT += 20;

	if(n_A_PassSkill5[4])
		n_A_HIT += 50;

	if(n_A_PassSkill7[0])
		n_A_HIT += 30;
	if(n_A_PassSkill8[18])
		n_A_HIT += 3;
	if(n_A_PassSkill8[20])
		n_A_HIT += 10;

	//BGFOOD DE HIT
	if(n_A_PassSkill8[29]){
		n_A_HIT += 33;}

	if(n_A_PassSkill3[4]) // Humming - Hit song
	{
		// Belmont Whip#1378#11th Bonus - Double HIT from song
		humming_sqi_bonus = ((1378 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 11) > -1) || humming_bonus) ? 2 : 1;
		n_A_HIT += (10 + n_A_PassSkill3[4] * 2 + n_A_PassSkill3[34] + Math.floor(n_A_PassSkill3[24] /10)) * humming_sqi_bonus;
	}

	//[Talon Tales Custom - 2018-07-28 - Glorious Cleaver  +2HIT per refne] [Amor]
	if (EquipNumSearch(1088))
		n_A_HIT += (2 * n_A_Weapon_ATKplus);

	//custom Talon Tales Armor enchant HIT
	var wHSE = document.calcForm.A_HSE.value;
	if(wHSE){
		if(311 <= wHSE && wHSE <= 319)
			n_A_HIT += (parseInt(wHSE.substr(-1)) * 4);
	}

	//[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for Fighting Spirit/Sharp - HIT] [Kato]
		for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
			var vME = tRO_MalangdoEnchantment[i];
			if(vME >= 1781 && vME <= 1788) { //FS
				if(vME.substr(-1) <= 4)
					n_A_HIT += 1 + parseInt(vME.substr(-1));
				 else
					n_A_HIT += 5;
			}

			if(vME >= 1081 && vME <= 1085) { //Sharp
				n_A_HIT += 1 + parseInt(vME.substr(-1));
			}
		}

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for Fighting Spirit/Sharp - HIT] [NattWara]
		for(i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
			var vBE = tRO_BiolabWeaponEnchantment[i];
			if(vBE >= 1781 && vBE <= 1788) { //FS
				if(vBE.substr(-1) <= 4)
					n_A_HIT += 1 + parseInt(vBE.substr(-1));
				 else
					n_A_HIT += 5;
			}

			if(vBE >= 1081 && vBE <= 1085) { //Sharp
				n_A_HIT += 1 + parseInt(vBE.substr(-1));
			}
		}

	myInnerHtml("A_HIT",n_A_HIT,0);

	n_A_FLEE = n_A_BaseLV + n_A_AGI;
	
	// Moscow Headless Mule Cocktail - FLEE +30, cannot be used while in Berserk
	if (moscow_headless_mule_cocktail && !SkillSearch(12) && !SkillSearch(258))
		n_tok[9] += 30;

	// Antonio's Coat + Red Stocking Boots Combo#1731 - [Every Refine Level] of Shoes - FLEE + 1
	n_tok[9] += n_A_SHOES_DEF_PLUS * EquipNumSearch(1731);
	
	n_A_FLEE += n_tok[9];

	if(n_A_JobSearch()==2 && CardNumSearch(295)){
		n_A_FLEE += 20;
	}
	if(n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(271)){
		n_A_FLEE += 20;
	}
	if(n_A_SHOULDER_DEF_PLUS <= 4 && CardNumSearch(401)){
		n_A_FLEE += 10;
	}
	if(n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(403)){
		n_A_FLEE += 5;
	}
	if(SU_STR >= 90 && EquipNumSearch(442)){
		n_A_FLEE += 10 * EquipNumSearch(442);
	}
	if(n_A_PassSkill6[0] == 2 && n_A_PassSkill6[1] >= 1 && n_A_BodyZokusei==4){
		n_A_FLEE += n_A_PassSkill6[1] *3;
	}
	//Bloody Roar FLEE -160 - [Loa] - 2018-06-11
	if(EquipNumSearch(483)){
			n_A_FLEE -= 160;
	}

	if(n_A_JOB == 24){
		n_A_FLEE += Math.round(SkillSearch(273) /2);
	}
	if(n_A_PassSkill2[9] && SkillSearch(273)==0){
		n_A_FLEE += Math.round(n_A_PassSkill2[9] /2);
	}
	if(n_A_PassSkill5[4]){
		n_A_FLEE += 50;
	}
	if(n_A_PassSkill7[1]){
		n_A_FLEE += 30;
	}
	if(n_A_PassSkill8[30]){
		n_A_FLEE += 33;
	}
	if(n_A_PassSkill3[0]) // A Whistle - Base_FLEE_Boost - Skill Lv + Floor(AGI / 10) + Floor(Music_Lessons_Lv / 2)
		n_A_FLEE += n_A_PassSkill3[0] + Math.floor(n_A_PassSkill3[30] / 2) + Math.floor(n_A_PassSkill3[20] / 10) + whistle_flee_bonus * 5;

	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1276)){
		n_A_FLEE += 10;
	}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1280)){
		n_A_FLEE += 10;
	}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1282)){
		n_A_FLEE += 10;
	}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1283)){
		n_A_FLEE += 10;
	}
	if(n_A_HEAD_DEF_PLUS >= 9 && EquipNumSearch(1285)){
		w += 5;
	}
	//custom Talon Tales Armor enchant FLEE
	var wHSE = document.calcForm.A_HSE.value;
	if(wHSE){
		//var w_enchant = wHSE % 10;
		if(301 <= wHSE && wHSE <= 309)
			n_A_FLEE += parseInt(wHSE.substr(-1));
	}
	//[Custom Talon Tales 2018-07-10 - Biolab Armor Enchantment for FLEE] [NattWara]
	for(i=0;i<tRO_BiolabArmorEnchantment.length;i++) {
		var vBE = tRO_BiolabArmorEnchantment[i];
		if(vBE >= 301 && vBE <= 309) {
			n_A_FLEE += parseInt(vBE.substr(-1));
		}
	}
	//[Custom Talon Tales 2018-07-12 - Eden Armor Enchantment for FLEE] [NattWara]
	for(i=0; i < tRO_EdenArmorEnchantment.length; i++) {
		var vEE = tRO_EdenArmorEnchantment[i];
		if(301 <= vEE && vEE <= 309) {
			n_A_FLEE += parseInt(vEE.substr(-1));
		}
	}
	//[Custom Talon Tales 2018-07-12 - El Dicaste Enchantment for FLEE] [NattWara]
	for(i=0; i < tRO_EDEnchantment.length; i++) {
		var vED = tRO_EDEnchantment[i];
		if(301 <= vED && vED <= 312) {
			n_A_FLEE += parseInt(vED.substr(-2));
		}
	}
	//[Custom Talon Tales 2018-07-12 - Mora Enchantment for FLEE] [NattWara]
	for(i=0; i < tRO_MoraEnchantment.length; i++) {
		var vMORA = tRO_MoraEnchantment[i];
		if(301 <= vMORA && vMORA <= 312) {
			n_A_FLEE += parseInt(vMORA.substr(-2));
		}
	}
	//custom Talon Tales Sedora Card (fixed (2015-12-21),(fixed (2016-11-02))
	if(n_A_JobSearch()==2 && CardNumSearch(524)){
		n_A_FLEE += 4*CardNumSearch(524);
	}
	
	// Tenebris Latitantes#1776 - FLEE + 1 for every Base AGI while under the effect of [Illusionary Shadow#444]
	if (SkillSearch(444) && EquipNumSearch(1776))
		n_A_FLEE += SU_AGI;
	
	//flee reduction when mobbed updated [Loa] 2018-08-11
	let fleeReduc = n_A_PassSkill8[12] + n_A_PassSkill8[33] + n_A_PassSkill8[34]
	if(fleeReduc > 2){
		n_A_FLEE -= Math.floor(n_A_FLEE * ((fleeReduc - 2) * 0.1));
	}
	/*****BELOW HERE SHOULD ONLY BE DIRECT SKILL BONUSES TO FLEE*****/
	//dodge
	monkDodge = new Array(0,1,3,4,6,7,9,10,12,13,15);
	n_A_FLEE += monkDodge[SkillSearch(191)];
	//close confine
	if(SkillSearch(383)){
		n_A_FLEE += 10;}
	//comfort of the moon
	if(SkillSearch(356)){
		n_A_FLEE += Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 10);}
	//improve dodge
	if(n_A_JOB==8||n_A_JOB==14||n_A_JOB==22||n_A_JOB==28){
		n_A_FLEE += 4 * SkillSearch(14);
	}else{
		n_A_FLEE += 3 * SkillSearch(14);}
	//adjustment
	if(SkillSearch(421)){
		n_A_FLEE += 30;}
	
	// Gatling Fever#433 - Decreases Flee by 5 * SkillLV
	// Scouter#1387#6th Bonus - Ignore [Gatling Fever] FLEE and Movement Speed penalties. Dispell [Gatling Fever] on unequip
	if (20 == n_A_WeaponType && SkillSearch(433) && (1387 != n_A_Equip[3] || SQI_Bonus_Effect.findIndex(x => x == 6) == -1))
			n_A_FLEE -= 5 * SkillSearch(433);

	//berserk
	if(SkillSearch(258)){
		n_A_FLEE /= 2;}
	//negative flee
	if (n_A_FLEE < 0){
		n_A_FLEE = 0;}

	myInnerHtml("A_FLEE",n_A_FLEE + "<br><b>WOE: </b>" + Math.floor(n_A_FLEE*.8),0);

	// Dullahan's Ale - Perfect Dodge + 10
	if (dullahan_ale_cocktail)
		n_tok[11] += 10;

	// Duneyrr Card#511 [Lord Knight] When activated during Frenzy, add another Perfect Dodge + 10.
	if (SkillSearch(258) && TimeItemNumSearch(51))
		n_tok[11] += 10 * CardNumSearch(511);

	// #117 - Baby Skoll - [Extended Class] Perfect Dodge +3
	if (n_A_PassSkill8[0] == 117 && (n_A_JobSearch() > 6 || 20 == n_A_JOB))
		n_tok[11] += 3;
	
	// A Whistle Skill - Base_P._D._Boost - Floor((Skill Lv + 1) / 2 + LUK / 30) + Floor(Music_Lessons_Lv / 5)
	if (n_A_PassSkill3[0])
		n_tok[11] += Math.floor((n_A_PassSkill3[0] + 1) / 2 + n_A_PassSkill3[46] / 30) + Math.floor(n_A_PassSkill3[30] / 5) + whistle_pd_bonus;

	n_A_LUCKY = 1 + n_A_LUK * 0.1;
	n_A_LUCKY += n_tok[11];

	if(n_A_JobSearch()==2)
		n_A_LUCKY += 5 * CardNumSearch(391);

	if(n_A_JobSearch()==1)
		n_A_LUCKY += 3 * CardNumSearch(354);
	if(n_A_SHOULDER_DEF_PLUS <= 4 && CardNumSearch(401))
		n_A_LUCKY += 1;
	if(n_A_Equip[7]==535){
		var wHPVS = n_A_JobSearch();
		if(wHPVS==3 || wHPVS==4 || wHPVS==5){
			n_A_LUCKY += 5;
			n_A_LUCKY += n_A_SHOULDER_DEF_PLUS * 2;
		}
	}

	if(n_A_JobSearch()==41 && EquipNumSearch(678))
		n_A_LUCKY += 2;

	//custom Talon Tales Lady Tanee Card: +1 Perfect Dodge per 8 base LUK
	if(CardNumSearch(409))
		n_A_LUCKY += Math.floor(SU_LUK / 8);
	//custom Talon Tales Schwartzwald Pine Jubilee fix: +20 Perfect Dodge instead of +20 Flee
	if(n_A_PassSkill8[20])
		n_A_LUCKY += 20;

	//custom Talon Tales Improved Kitsune Mask: If refine > 6 Perfect Dodge + 4 - [Loa] - 2016-06-07
	if(EquipNumSearch(1652) && n_A_HEAD_DEF_PLUS > 6){
		n_A_LUCKY += 4;
	}

	//Bloody Roar Perfect Dodge -160 - [Loa] - 2018-06-11
	if(EquipNumSearch(483)){
		if(n_A_LUCKY < 160){
			n_A_LUCKY -= n_A_LUCKY;
		}
		else{
			n_A_LUCKY -= 160;
		}
	}

	n_A_LUCKY = Math.round(n_A_LUCKY *10)/10;

	myInnerHtml("A_LUCKY",n_A_LUCKY,0);

	n_A_CRI = 1 + n_A_LUK / 3.0;
	
	// Following Status Change are taken into consideration for Katar Crit bonus
	
	sc_inccri_bonus = 0;
	// SC_INCCRI - Abrasive - CRIT + 30
	if (abrasive_food)
		sc_inccri_bonus = 30;
	// SC_INCCRI - Buche De Noel - CRIT + 7
	if (n_A_PassSkill8[18])
		sc_inccri_bonus = Math.max(7, sc_inccri_bonus);
	// SC_INCCRI - Arunafeltz Desert Sandwich - CRIT + 7
	if (n_A_PassSkill8[21])
		sc_inccri_bonus = Math.max(7, sc_inccri_bonus);	
	
	n_A_CRI += sc_inccri_bonus;
	
	// SC_EXPLOSIONSPIRITS - Critical Explosion - CRIT + 7.5 + Skill Lv * 2.5
	if (SkillSearch(195))
		n_A_CRI += 7.5 + SkillSearch(195) * 2.5;
	if (SkillSearch(253)) // Super Novice Fury State
		n_A_CRI += 50;
	
	// SC_FORTUNE
	if (n_A_PassSkill3[5]) // Fortune's Kiss
	{
		// Belmont Whip#1378#10th - [Fortune's Kiss] CRIT Rate + 1 for every level
		fortune_sqi_bonus = ((1378 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 10) > -1) || fortune_bonus) ? 2 : 1;
		n_A_CRI += 10 + fortune_sqi_bonus * n_A_PassSkill3[5] + Math.floor(n_A_PassSkill3[35] /2) + Math.floor(n_A_PassSkill3[25] /10) + fortune_extra_bonus * 5;
	}
	
	// SC_TRUESIGHT
	if (n_A_JOB == 24)
		n_A_CRI += SkillSearch(270);
	
	n_tok[10] += n_tok[110+n_B[2]];
	
	// Empty Liquor Bottle#1736 [Every Refine Level] - CRIT + 1
	n_tok[10] += n_A_Weapon_ATKplus * EquipNumSearch(1736);

	if (CardNumSearch(402))
		n_tok[10] += n_A_SHOULDER_DEF_PLUS;
	if (n_A_JobSearch()==2)
		n_tok[10] += 4 * CardNumSearch(328);
	if (n_A_JobSearch()==3 && (n_B[2]==1 || n_B[2]==6))
		n_tok[10] += 9 * CardNumSearch(253);
	if (SU_LUK >= 80 && CardNumSearch(267))
		n_tok[10] += 3;
	if (n_A_WeaponType==3 || n_A_WeaponType==2)
		n_tok[10] += CardNumSearch(464) * 5;
	if (n_A_WeaponType==10)
		n_tok[10] += CardNumSearch(465) * 5;
	if (CardNumSearch(492))
		n_tok[10] += Math.floor(n_A_JobLV /10) * CardNumSearch(492);
	if (n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(785))
		n_tok[10] += (n_A_HEAD_DEF_PLUS -5);
	if (EquipNumSearch(640))
		n_tok[10] += Math.floor(SU_LUK / 5);

	//custom Talon Tales rental Giant Encyclopedia +1crit each 5luk
	if (EquipNumSearch(1324))
		n_tok[10] += Math.floor(SU_LUK / 5);

	//custom Talon Tales Improved Bunny Band: If refine > 6 CRIT + 5
	if (EquipNumSearch(1648) && n_A_HEAD_DEF_PLUS > 6)
		n_tok[10] += 5;

	/*Element - n_B[3] = elementID - example n_B[3] = 4, Neutral4(on site)
	Neutral - 1 - 4
	Water - 11 - 14
	Earth - 21 - 24
	Fire - 31 - 34
	Wind - 41 - 44
	Poison - 51 - 54
	Holy - 61 - 64
	Shadow - 71 - 74
	Ghost - 81 - 84
	Undead - 91 - 94
	*/
	/*
	Race - n_B[2] = raceID - example n_B[2] = 3, Plant
	0 - Formless
	1 - Undead
	2 - Brute
	3 - Plant
	4 - Insect
	5 - fish
	6 - Demon
	7 - Demi-Human
	8 - Angel
	9 - Dragon
	*/

	if (EquipNumSearch(689))
		n_tok[10] += Math.floor(SU_LUK / 10);
	if (SU_AGI >= 90 && EquipNumSearch(442))
		n_tok[10] += 10 * EquipNumSearch(442);

	if (n_A_JobSearch()==41 && EquipNumSearch(675))
		n_tok[10] += 5;
	if (EquipNumSearch(623))
		n_tok[10] += n_A_Weapon_ATKplus;
	if (EquipNumSearch(1122) && n_A_JobSearch()==6)
		n_tok[10] += 5;
	if (EquipNumSearch(1161))
		n_tok[10] += (2 * SkillSearch(89));
	if (SU_DEX >= 90 && EquipNumSearch(1164))
		n_tok[10] += 5;
	//custom Talon Tales fix so crit rate is increased for Sharp Shooting too by Drosera/Sharp Arrow
	if (n_A_WeaponType == 10 && n_A_Arrow == 15)
		n_tok[10] += 20;
	if (n_A_WeaponType==10 || 17<=n_A_WeaponType && n_A_WeaponType<=21)
		n_tok[10] += CardNumSearch(462) * 15;

	else if (TimeItemNumSearch(34))
		n_tok[10] += 10;

	//[Talon Tales Custom - 2018-07-26 - Valorous Battle CrossBow +25 CRIT for Archer Classes] [Amor]
	if(EquipNumSearch(913) && n_A_JobSearch() == 4) {
		n_tok[10] += 25;
		n_tok[133] += 5;
	}

	// Glorious Gatling Gun#1101 - [Every Refine Level] - CRIT + 5, increases physical attack against Players by 5% and resistance against Players by 2%
	if (EquipNumSearch(1101)) {
		n_tok[10] += 5 * n_A_Weapon_ATKplus;
		n_tok[37] += 5 * n_A_Weapon_ATKplus;
		n_tok[57] += 2 * n_A_Weapon_ATKplus;
	}

	//[Talon Tales Custom - 2018-07-28 - Glorious Gladious +10 CRIT per refine for Soul Linker] [Amor]
	if(EquipNumSearch(1076) && n_A_JOB == 43)
		n_tok[10] += (10 * n_A_Weapon_ATKplus);

	//custom Talon Tales Armor enchant CRIT
	var wHSE = document.calcForm.A_HSE.value;
	if(wHSE){
		if(151 <= wHSE && wHSE <= 159)
			n_tok[10] += parseInt(wHSE.substr(-1));
	}

	//custom Talon Tales Halloween Midas Whisper
	if(SU_LUK >= 80 && EquipNumSearch(1526))
		n_tok[10] += 5;

	//[Custom Talon Tales - 2018-06-02 - Aegir shoes + helm combo(CRIT + 1% * refinement for Fish type monsters)] [Kato/Nattwara]
	if (n_B[2] == 5 && EquipNumSearch(1554)) // Race = 5 (Fish)
		n_tok[10] += n_A_SHOES_DEF_PLUS * EquipNumSearch(1554);

	//[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for Sharp - CRIT [Kato]
	for (i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];
		if (vME >= 1081 && vME <= 1085) {
			if (vME.substr(-1) == 1)
				n_tok[10] += 3;
			else
				n_tok[10] += 3 + parseInt(vME.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for Sharp - CRIT [NattWara]
	for (i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
		var vBE = tRO_BiolabWeaponEnchantment[i];
		if (vBE >= 1081 && vBE <= 1085) {
			if(vBE.substr(-1) == 1)
				n_tok[10] += 3;
			else
				n_tok[10] += 3 + parseInt(vBE.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-07-12 - Eden Armor Enchantment for CRIT] [NattWara]
	for (i=0; i < tRO_EdenArmorEnchantment.length; i++) {
		var vEE = tRO_EdenArmorEnchantment[i];
		if (151 <= vEE && vEE <= 159) {
			var val = parseInt(vEE.substr(-1));
			n_tok[10] += val;
		}
	}

	//[Custom Talon Tales 2018-07-12 - El Dicaste Enchantment for CRIT] [NattWara]
	for (i=0; i < tRO_EDEnchantment.length; i++) {
		var vED = tRO_EDEnchantment[i];
		if (151 <= vED && vED <= 159) {
			var val = parseInt(vED.substr(-1));
			n_tok[10] += val;
		}
	}

	//[Custom Talon Tales 2018-07-12 - Mora Enchantment for CRIT] [NattWara]
	for (i=0; i < tRO_MoraEnchantment.length; i++) {
		var vMORA = tRO_MoraEnchantment[i];
		if (151 <= vMORA && vMORA <= 159) {
			var val = parseInt(vMORA.substr(-1));
			n_tok[10] += val;
		}
	}

	//[Talon Tales Custom 2018-07-25 - Assaulter Lance +30 CRIT Crusader/Paladin] [Amor]
	if (EquipNumSearch(904) && n_A_JobSearch2() == 13)
		n_tok[10] += 30;
	
	// Brave Huuma Front Shuriken#930 - [Refine Level >= 8] - CRIT + 30
	if (n_A_Weapon_ATKplus >= 8 && EquipNumSearch(930))
		n_tok[10] += 30;

	n_A_CRI += n_tok[10];

	//custom Talon Tales Gryphon Card
	if(CardNumSearch(277)) {
		n_A_CRI -= Math.floor(SU_STR /11) * 2 * CardNumSearch(277);
	}

	n_A_CRI = Math.round(n_A_CRI * 10) / 10;

	if(n_A_PassSkill8[16]){
		n_A_CRI = 0;
	}
	
	if (n_A_WeaponType == 11) // Katar CRIT bonus, only applied to LUK CRIT and above SC
		n_A_CRI *= 2;
	// SC_CLOAKING - CRIT * 2
	n_A_CRI += n_A_CRI * Math.min(1, SkillSearch(82));

	myInnerHtml("A_CRI",n_A_CRI,0);

	// Manage ATK Display
	
	// Weapon refine ATK bonus
	if(n_A_WeaponLV == 1){W_REF = n_A_Weapon_ATKplus * 2;}
	else if(n_A_WeaponLV == 2){W_REF = n_A_Weapon_ATKplus * 3;}
	else if(n_A_WeaponLV == 3){W_REF = n_A_Weapon_ATKplus * 5;}
	else if(n_A_WeaponLV == 4){W_REF = n_A_Weapon_ATKplus * 7;}
	else{W_REF = 0;}

	if(n_Nitou){
		if(n_A_Weapon2LV == 1){W_REF2 = n_A_Weapon2_ATKplus * 2;}
		else if(n_A_Weapon2LV == 2){W_REF2 = n_A_Weapon2_ATKplus * 3;}
		else if(n_A_Weapon2LV == 3){W_REF2 = n_A_Weapon2_ATKplus * 5;}
		else if(n_A_Weapon2LV == 4){W_REF2 = n_A_Weapon2_ATKplus * 7;}
	W_ATKD = n_A_Weapon_ATK + n_A_Weapon2_ATK;}
	else{W_ATKD = n_A_Weapon_ATK;
		 W_REF2 = 0;}
	
	// n_tok[87] is not really used as of today, only on Yellow/Green/Pink Sheila Hairnet
	// So we can ignore the fact that n_tok[87] even though applied on n_A_ATK and should not be displayed
	P_ATK = n_A_ATK + W_ATKD;
	H_ATK = P_ATK;
	
	// H_ATK dedicated for WoE ATK bonus
	// FIXME : Add Glorious Weapon ATK bonus
	
	myInnerHtml("A_ATK2", Math.round(P_ATK) +"+"+ (W_REF+W_REF2) + "<br><b>WOE: </b>" + Math.round(H_ATK) +"+" + (W_REF+W_REF2),0);

	n_A_MATK = [0,0,0];

	var w = Math.floor(n_A_INT / 7);
	n_A_MATK[0] = n_A_INT + w * w;

	w = Math.floor(n_A_INT / 5);
	n_A_MATK[2] = n_A_INT + w * w;

	//MATK% stuff
	w = 100;

	/*
		Skull Cap#1757 
		[Refine Rate 5~10] Additional MATK + 2%
		[Refine Rate 7~10] Additional MATK + 1%
		[Refine Rate 10] Cast time - 5%
	*/
	if (EquipNumSearch(1757))
	{
		if (n_A_HEAD_DEF_PLUS > 4)
			n_tok[89] += 2;
		if (n_A_HEAD_DEF_PLUS > 6)
			n_tok[89] += 1;
		if (10 == n_A_HEAD_DEF_PLUS)
			n_tok[73] -= 5;
	}
	
	// Glorious Gladius#1076 - [Rogue/Stalker or Ninja][Every Refine Level] - MATK + 2%
	if (EquipNumSearch(1076) && (n_A_JobSearch2() == 14 || n_A_JOB == 44))
		n_tok[89] += 2 * n_A_Weapon_ATKplus;
	
	// Professor Celia Card#624
	if (CardNumSearch(624))
	{
		n_tok[89] += Math.floor(SU_STR / 8); // [Every 8 Base STR] MATK + 1%
		n_tok[12] += Math.floor(SU_INT / 8) * 2; // [Every 8 Base INT] ASPD + 2%
	}
	
	// Glorious Staff of Destruction#1083 - [Every Refine Leve] - MATK + 3% for 6 seconds when using magic attacks at a 1% chance per refine.
	if (TimeItemNumSearch(59))
		n_tok[89] += 3 * n_A_Weapon_ATKplus;
	
	w += n_tok[89];

	if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(642))
		w += 3;
	if(EquipNumSearch(646))
		w += Math.floor(n_A_Weapon_ATKplus / 2);
	if(EquipNumSearch(737))
		w += n_A_Weapon_ATKplus;
	if(EquipNumSearch(1042))
		w += n_A_Weapon_ATKplus;
	if(EquipNumSearch(1029) && n_A_HEAD_DEF_PLUS >= 6)
		w += n_A_HEAD_DEF_PLUS - 5;
	if(n_A_PassSkill6[2])
		w += 10;
	if(n_A_JobSearch()==5 && CardNumSearch(454))
		w +=3;
	if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[8]==177)
		w += 2;
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1284)){
		w += 3;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1286)){
		w += 2;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1287)){
		w += 2;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1292)){
		w += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1293)){
		w += 1;}
	if(EquipNumSearch(1520) && SU_INT == 99)
		w += 1;
	if(n_A_Equip[0]==484 && SU_INT >= 70)
		w += 5;
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1277)){
		w += 2;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1281)){
		w += 8;}
	//sag diadem
	if(n_A_HEAD_DEF_PLUS == 10 && EquipNumSearch(1289)){
		w += 4;}

	//Entweihen Hairband - zonesoldier - 6/2/2018
	//Increase MATK + 1% per upgrade past 5th upgrade
	if(n_A_HEAD_DEF_PLUS > 4 && EquipNumSearch(1620))
	{
		w += 1 * (n_A_HEAD_DEF_PLUS - 4);
	}

	// Maiden Hat#1628 - [Every Refine Level Above 6] MATK + 1%. - ZoneSoldier - 6/6/2018
	if(n_A_HEAD_DEF_PLUS > 6 && EquipNumSearch(1628)){
		w += 1 * (n_A_HEAD_DEF_PLUS - 6);
	}
	//custom Talon Tales Staff of Thea: Increase MATK by 1% for every 2 upgrades - [Loa] - 2016-06-07
	if(EquipNumSearch(1640)){
		w += Math.floor(n_A_Weapon_ATKplus / 2);
	}
	//custom Talon Tales Improved Mage Hat: Increase MATK by 1% for every 2 upgrades - [Loa] - 2016-06-07
	if(EquipNumSearch(1645)){
		w += Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	//Yellow/Green/Pink Sheila Hairnet [Refine Rate 9+] Increase MATK by 2% [Refine Rate 10] Increase MATK by 2% - [Loa] - 2016-06-29
	if(EquipNumSearch(1022) || EquipNumSearch(1026) || EquipNumSearch(1073)){
		if(n_A_HEAD_DEF_PLUS >= 9){
			w += 2;
		}
		if(n_A_HEAD_DEF_PLUS == 10){
			w += 2;
		}
	}
	//Silver/Violet/Orange/Blue Sheila Hairnet [Refine Rate 9+] Increase Physical Damage and MATK by 2% [Refine Rate 10] Cast Time - 10% - [Loa] - 2016-06-29
	if(EquipNumSearch(1024) || EquipNumSearch(1025) || EquipNumSearch(1062) || EquipNumSearch(1074)){
		if(n_A_HEAD_DEF_PLUS >= 9){
			n_tok[80] += 2;
			w += 2;
		}
		if(n_A_HEAD_DEF_PLUS == 10){
			n_tok[73] -= 10;
		}
	}
	//[Talon Tales Custom - 2018-07-27 - Glorious Apocalypse/Glorious Arc Wand  - Every Refine Level gives -1% Casting Time] [Amor]
	if(EquipNumSearch(1095) || EquipNumSearch(1084)){
		n_tok[73] -= n_A_Weapon_ATKplus;
	}

	//[Talon Tales Custom - 2018-07-29 - Glorious Jamadhar - +1 CRIT in demi-human per refine] [Amor]
	if(EquipNumSearch(1091) && n_B[2] == 7) {
			n_tok[117] -= n_A_Weapon_ATKplus;
	}
	//[Talon Tales Custom - 2018-07-29 - Glorious Shotgun - +10% Blind Resistence per refine] [Amor]
	if(EquipNumSearch(1102)) {
			n_tok[154] += (10 * n_A_Weapon_ATKplus);
			if(n_tok[154] > 100) n_tok[154] = 100;
	}
	// Tegron
	if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(934)) {
		n_tok[73] -= 20;
		n_tok[74] += 20;
	}

	// Zakudam#595 + Archdam#190 [Vanilla Mode] Cast Time - 30%
	if (document.calcForm.vanilla.checked && CardNumSearch(595) && CardNumSearch(190))
		n_tok[73] -= 30;
	
	// Enforcer Cape#1699 + Enforcer Shoes#1700 Set#1701 10% Aftercast Reduction with [Meteor Assault]
	n_tok[74] += 10 * EquipNumSearch(1701);

	//Note 2018-07-12 [NattWara]
	//Fix for Issue#252
	/*
		Those +ATK% stuff are supposed to be around here I supposed.
		Because they use bonus2 bAddRace,RC_NonBoss,(ATK%);
						 bonus2 bAddRace,RC_Boss,(ATK%);
						 bonus2 bAddRace2,5,(ATK%);
		like Turtle General Card even though the description is saying +ATK%.
		so I'm using n_tok[80] for +ATK% as I'm sticking to the script.
	*/

	//custom Talon Tales Rainbow Poring Hat +1% atk
	if(EquipNumSearch(1447)){
		if(n_A_HEAD_DEF_PLUS>=7){
			n_tok[80] += 1;
		}
	}

	//custom Talon Tales Evil Marching Hat: if refine rate >=9 +5% ATK
	if(EquipNumSearch(1539) && n_A_HEAD_DEF_PLUS >= 9){
		n_tok[80] += 5;
	}

	//[Custom Talon Tales - 2018-07-09 Ancient Gold Adornment - ATK% & MATK%] [NattWara]
	if(EquipNumSearch(1663)){
		var wHPVS = n_A_JobSearch();
		if(wHPVS==1 || wHPVS==2 || wHPVS==6){
			n_tok[80] += 4;
		}
		if(wHPVS==3 || wHPVS==5){
			w += 4;
		}
	}

	//Red Wing Hat [Refine Rate > 6] Physical Damge + 2%, MATK + 2% [Refine Rate > 8] Physical Damge + 2%, MATK + 2% - [Loa] - 2018-07-03
	if(EquipNumSearch(1135)){
		if(n_A_HEAD_DEF_PLUS > 6){
			n_tok[80] += 2;
			w += 2;
		}
		if(n_A_HEAD_DEF_PLUS > 8){
			n_tok[80] += 2;
			w += 2;
		}
	}

	//custom Talon Tales Kris enchant ATK%
	var KEbonus = [document.calcForm.A_KE11.value,document.calcForm.A_KE12.value,document.calcForm.A_KE21.value,document.calcForm.A_KE22.value];
	for (i=0;i<KEbonus.length;i++){
		var wKE = KEbonus[i];
		if(wKE){
			if(171 <= wKE && wKE <= 179)
				n_tok[80] += parseInt(wKE.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-06-16 - Malangdo Enchantment for ATK%] [Kato]
	for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];
		if (vME >= 171 && vME <= 179) {
			n_tok[80] += parseInt(vME.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-07-12 - Eden Weapon Enchantment] [NattWara]
	for(i=0; i < tRO_EdenWeaponEnchantment.length; i++) {
		var vEE = tRO_EdenWeaponEnchantment[i];

		//ATK + 2%
		if (vEE >= 171 && vEE <= 179) {
			n_tok[80] += parseInt(vEE.substr(-1));
		}

		//MATK + 2%
		if (vEE >= 891 && vEE <= 899) {
			w += parseInt(vEE.substr(-1));
		}

		//Physical vs Race + 10%
		if (vEE >= 2030 && vEE <= 2039) {
			n_tok[eval(vEE) - 2000] += 10;
		}

		//Magical vs Race + 5%
		if (vEE >= 2170 && vEE <= 2179) {
			n_tok[eval(vEE) - 2000] += 5;
		}
	}

	//[Custom Talon Tales 2018-07-12 - El Dicaste Enchantment] [NattWara]
	for(i=0; i < tRO_EDEnchantment.length; i++) {
		var vED = tRO_EDEnchantment[i];

		//ATK + 2%, ATK + 3%
		if (vED >= 171 && vED <= 179) {
			n_tok[80] += parseInt(vED.substr(-1));
		}

		//MATK + 1%, MATK + 2%
		if (vED >= 891 && vED <= 899) {
			w += parseInt(vED.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-07-12 - Mora Enchantment] [NattWara]
	for(i=0; i < tRO_MoraEnchantment.length; i++) {
		var vMORA = tRO_MoraEnchantment[i];

		//ATK + 2%, ATK + 3%
		if (vMORA >= 171 && vMORA <= 179) {
			n_tok[80] += parseInt(vMORA.substr(-1));
		}

		//MATK + 1%, MATK + 2%
		if (vMORA >= 891 && vMORA <= 899) {
			w += parseInt(vMORA.substr(-1));
		}
	}


	//Custom Talon Tales - 2018-06-07 - Enhanced Hat of the Sun God [1] - MATK part [Nattwara]
	/*
	[Refine Rate 5+]
	ATK + 4, MATK + 1%
	[Refine Rate 6+]
	ATK + 4, MATK + 1%
	[Refine Rate 7+]
	ATK + 6, MATK + 1%
	[Refine Rate 8+]
	ATK + 6, MATK + 2%
	*/
	if(EquipNumSearch(1654)){
		if(n_A_HEAD_DEF_PLUS>4)
			w += 1;

		if(n_A_HEAD_DEF_PLUS>5)
			w += 1;

		if(n_A_HEAD_DEF_PLUS>6)
			w += 1;

		if(n_A_HEAD_DEF_PLUS>7)
			w += 2;
	}

	if(n_A_JOB==14 || n_A_JOB==28){
		w += 10 * CardNumSearch(479);}

	//custom Talon Tales Lady Tanee Card: +1% MATK  per 8 base VIT
	if (CardNumSearch(409))
		w += Math.floor(SU_VIT / 8);
	//custom Talon Tales Rainbow Poring Hat +1% matk
	if(EquipNumSearch(1447))
		if(n_A_HEAD_DEF_PLUS>=7)
			w += 1;
	//custom Talon Tales Black Wing +3% matk each refine
	if(EquipNumSearch(1463))
		w += 3*n_A_Weapon_ATKplus;
	//custom Talon Tales RWC Commemorative Pin +1% matk each refine above 4
	if(EquipNumSearch(1468) && n_A_HEAD_DEF_PLUS >= 4)
		w += n_A_HEAD_DEF_PLUS-3;
	//custom Talon Tales Halloween Midas Whisper
	if(SU_INT >= 80 && EquipNumSearch(1526))
		w += 3;
	//custom Talon Tales Kris enchant MATK%
	var KEbonus = [document.calcForm.A_KE11.value,document.calcForm.A_KE12.value,document.calcForm.A_KE21.value,document.calcForm.A_KE22.value];
	for (i=0;i<KEbonus.length;i++){
		var wKE = KEbonus[i];
		if(wKE){
			if(891 <= wKE && wKE <= 899){
				w += parseInt(wKE.substr(-1));
			}
		}
	}

	// [Custom Talon Tales 2018-06-16 - Malangdo Enchantment for MATK%] [Kato]
	for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];

		if(vME >= 891 && vME <= 899) {
			w += parseInt(vME.substr(-1));
		}
	}

	//Balloon Hat Matk Bonus
	if(EquipNumSearch(849)){
		w += (n_A_HEAD_DEF_PLUS / 2);
	}

	//Gemini Crown - [Loa] - 2018-07-04
	if(EquipNumSearch(1280) && n_A_HEAD_DEF_PLUS >= 7){
		n_tok[98] += 15;
	}

	// Elemental Boots#1819 - [Refine Level +7 or Higher] MATK + 20
	if (n_A_SHOES_DEF_PLUS > 6 && EquipNumSearch(1819))
		n_tok[98] += 20;

	//custom Talon Tales Magical Booster & Staff of Piercing Combo
	if(EquipNumSearch(1430)& EquipNumSearch(645)){
		n_tok[98] += 3 * n_A_Weapon_ATKplus;
		if(n_A_Weapon_ATKplus==10){
			n_tok[98] += 25;
		}
	}
	//custom Talon Tales Magical Booster & Hypnotist's Staff
	if(EquipNumSearch(1430)& EquipNumSearch(473)){
		n_tok[98] += 4 * n_A_Weapon_ATKplus;
		if(n_A_Weapon_ATKplus == 10){
			n_tok[98] += 25;
		}
	}

	//custom Talon Tales ID_ARG + MATK
	n_tok[98] += n_A_PassSkill9[42];
	
	/*
		Custom =[Entweihen Hairband]+[Dark Thorn Staff] combo
		[Refine Rate 5~10 Dark Thorn Staff]
  	For every 2 refines on the Dark Thorn Staff, add +10 MATK
		[ZoneSoldier] - 2018/05/06
	*/
	if(n_A_Weapon_ATKplus >= 5 && EquipNumSearch(1621)) {
		n_tok[98] += 10 * Math.floor((n_A_Weapon_ATKplus - 4)/2);
	}
	if(n_A_PassSkill7[2]){
		n_tok[98] += 10;
	}
	if(n_A_PassSkill7[10]){
		n_tok[98] += 20;
	}
	if(n_A_PassSkill8[19]){
		n_tok[98] += 5;
	}
	//MATK BGFOOD
	if(n_A_PassSkill8[32]){
		n_tok[98] += 15;
	}

	// Entweihen Crothen#501 - [Every 10 Base INT] MATK + 10, limited to a maximum of 50 additional MATK
	n_tok[98] += Math.min(50, Math.floor(n_A_INT / 10) * 10) * CardNumSearch(501);

	n_A_MATK[0] += n_tok[98];
	n_A_MATK[2] += n_tok[98];

	n_A_MATK[0] = Math.floor(n_A_MATK[0] * w / 100);
	n_A_MATK[2] = Math.floor(n_A_MATK[2] * w / 100);

	BK_n_A_MATK = [0,0,0];
	BK_n_A_MATK[0] = n_A_MATK[0];
	BK_n_A_MATK[2] = n_A_MATK[2];
	if(BK_n_A_MATK[0] != BK_n_A_MATK[2])
		BK_n_A_MATK[2] -= 1;
	BK_n_A_MATK[1] = (BK_n_A_MATK[2] + BK_n_A_MATK[0]) / 2;


	if (SkillSearch(276)){
		n_A_MATK[0] = Math.floor(n_A_MATK[0] * (1+ 0.05 * SkillSearch(276)));
		n_A_MATK[2] = Math.floor(n_A_MATK[2] * (1+ 0.05 * SkillSearch(276)));
	}
	
	// Mindbreaker [self] (applied after Power Amplification)
	if (n_A_PassSkill6[4]){
		w = 100 + 20 * n_A_PassSkill6[4];
		n_A_MATK[0] = Math.floor(n_A_MATK[0] * w / 100);
		n_A_MATK[2] = Math.floor(n_A_MATK[2] * w / 100);
	}
	
	// Myst Case's Surprise Cocktail - MATK +5% (applied after Mindbreaker)
	if (myst_case_suprise_cocktail) {
		n_A_MATK[0] = Math.floor(n_A_MATK[0] * 1.05);
		n_A_MATK[2] = Math.floor(n_A_MATK[2] * 1.05);
	}

	myInnerHtml("A_MATK",n_A_MATK[0] +"~"+ n_A_MATK[2],0);


	if(n_A_MATK[0] != n_A_MATK[2])
		n_A_MATK[2] -= 1;

	n_A_MATK[1] = (n_A_MATK[2] + n_A_MATK[0]) / 2;
	
	// Manage flat aspd bonus
	// Enhanced Helm of Angel#1655 - [If Refine Above 6] ASPD +1
	if (n_A_HEAD_DEF_PLUS > 6 && EquipNumSearch(1655))
		n_tok[99] += 1;
	
	// ASPD formula from rAthena
	aspd_rate = 1000;
	attack_motion = Math.floor(n_Nitou ? (JobASPD2[n_A_JOB][n_A_WeaponType] + JobASPD2[n_A_JOB][n_A_Weapon2Type]) * 7 / 10 : JobASPD2[n_A_JOB][n_A_WeaponType]);
	attack_motion = attack_motion - Math.floor(attack_motion * (4 * n_A_AGI + n_A_DEX) / 1000);
	attack_motion = attack_motion - n_tok[99] * 10;

	// Cavalry Mastery#78
	if (SkillSearch(78))
		n_tok[12] -= (6 - SkillSearch(78)) * 10;

	// Single Action#425
	n_tok[12] += Math.ceil(SkillSearch(425) / 2);
	
	// Advanced Book#224
	if (n_A_WeaponType == 12)
		n_tok[12] += SkillSearch(224) / 2;

	ASPDch = 0;
	if (n_A_IJYOU[0] == 0 && n_A_IJYOU[1] == 0){
		if (n_A_WeaponType == 3 && SkillSearch(74)){
			n_tok[12] += 30;
			ASPDch = 1;
		}
		if (n_A_WeaponType == 2 && SkillSearch(386)){
			n_tok[12] += 30;
			ASPDch = 1;
		}
		if (6 <= n_A_WeaponType && n_A_WeaponType<=8 && SkillSearch(152)){
			n_tok[12] += 30;
			ASPDch = 1;
		}
		if (ASPDch == 0 && SkillSearch(389)){
			n_tok[12] += 30;
			ASPDch = 1;
		}
		if (ASPDch == 0 && (TimeItemNumSearch(5) || TimeItemNumSearch(28))){//rush de alch set e noble hat
			if (n_A_WeaponType > 5 && n_A_WeaponType < 9){
				n_tok[12] += 30;
				ASPDch = 1;
			}
		}
		if (n_A_WeaponType==5 && SkillSearch(166)){
			n_tok[12] += SkillSearch(166) + 20;
			ASPDch = 1;
		}
	}

	if (EquipNumSearch(654))
		n_tok[12] += Math.floor(SU_AGI / 14);

	if (n_A_Equip[0]==484 && SU_STR >= 50)
		n_tok[12] += 5;

	if (EquipNumSearch(624))
		n_tok[12] += n_A_Weapon_ATKplus;

	if (EquipNumSearch(641))
		n_tok[12] += n_A_Weapon_ATKplus;

	if (SU_STR >= 77 && EquipNumSearch(944))
		n_tok[12] += 4;

	if (n_A_JOB == 21 && EquipNumSearch(855))
		n_tok[12] -= 5;

	if (EquipNumSearch(1121) && n_A_JobSearch()==2)
		n_tok[12] += 3;

	if (SU_STR >= 95 && EquipNumSearch(1167))
		n_tok[12] += 3;

	//custom Talon Tales Alca Bringer: +3% ASPD every 2 refines
	if (EquipNumSearch(1455))
		n_tok[12] += 3 * Math.floor(n_A_Weapon_ATKplus / 2);

	//custom Talon Tales Gigantic Lance: For every refine above +4, increase ASPD by 1% - [Loa] - 2016-06-07
	if (EquipNumSearch(1315) && n_A_Weapon_ATKplus>4)
		n_tok[12] += n_A_Weapon_ATKplus - 4;

	// Berserk#258
	if (SkillSearch(258))
		n_tok[12] += 30;

	// Madness Canceller#420 - + 20% ASPD
	if (SkillSearch(420))
		n_tok[12] += 20;

	// Gatling Fever#433
	if (n_A_WeaponType == 20 && SkillSearch(433))
		n_tok[12] += 2 * SkillSearch(433);

	// Sagittarius Crown#1288 - [Refine Rate 7~10] ASPD + 2%
	if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1288))
		n_tok[12] += 2;
	// Scorpio Crown#1290 - [Refine Rate 8~10] ASPD + 2%
	if (n_A_HEAD_DEF_PLUS >= 8 && EquipNumSearch(1290))
		n_tok[12] += 2
	// Scorpio Crown#1290 - [Refine Rate 10] ASPD + 2%
	if (n_A_HEAD_DEF_PLUS == 10 && EquipNumSearch(1290))
		n_tok[12] += 2;

	// Comfort of the Stars#357
	if (SkillSearch(357)){
		ASPDch = 1;
		n_tok[12] += Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 10);
	}

	if (SkillSearch(361) && n_A_JobLV >= 50){
		ASPDch = 1;
		n_tok[12] += 3 * SkillSearch(361);
	}
	
	// Adrenaline Rush party buff
	if (n_A_IJYOU[0] == 0 && n_A_IJYOU[1] == 0){ // Cancelled by Quagmire and Decrease Agility
		if (ASPDch == 0 && (
			(6 <= n_A_WeaponType && n_A_WeaponType<=8 && (n_A_PassSkill2[6] == 1 || n_A_PassSkill2[6] == 3)) ||		// Adrenaline Rush
			(n_A_PassSkill2[6] == 2 && n_A_WeaponType != 10 && !(17 <= n_A_WeaponType && n_A_WeaponType <= 21)))){ 	// Full Adrenaline Rush
			n_tok[12] += 20;
			ASPDch = 1;
		}
	}
	
	if (sunset_bonus)
		n_tok[344] += 10;
	else if (n_A_PassSkill3[1] && ASPDch == 0) { // Assassin Cross of Sunset song
		if (n_A_WeaponType != 10 && !(17 <= n_A_WeaponType && n_A_WeaponType <= 21))
			n_tok[12] += 5 + n_A_PassSkill3[1] + Math.floor(n_A_PassSkill3[31] / 2) + Math.floor(n_A_PassSkill3[21] / 20);
	}

	// Steel Body#196
	if (SkillSearch(196))
		n_tok[12] -= 25;

	if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1283))
		n_tok[12] += 3;

	if (n_A_SpeedPOT)
		n_tok[12] += 5 + 5 * n_A_SpeedPOT;

	//custom Talon Tales Armor enchant ASPD
	var wHSE = document.calcForm.A_HSE.value;
	if (wHSE){
		if (121 <= wHSE && wHSE <= 129)
			n_tok[12] += parseInt(wHSE.substr(-1));
	}

	//Thief Ring & Cold Heart aspd boost fix
	if (EquipNumSearch(1003)& EquipNumSearch(442))
		n_tok[12] += (n_A_Weapon_ATKplus / 2);

	//custom Talon Tales Imperial Feather
	if (SU_AGI >= 90 && EquipNumSearch(1475))
		n_tok[12] += 1;


	//custom Talon Tales Tasty Strawberry Hat
	if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1503))
		n_tok[12] += 4;

	//custom Talon Tales Halloween Midas Whisper
	if (SU_AGI >= 80 && EquipNumSearch(1526))
		n_tok[12] += 5;


	//[Talon Tales Custom - 2018-07-26 - Valorous Battle CrossBow - + 10% ASPD for Thief Class] [Amor]
	if (EquipNumSearch(913) && n_A_JobSearch() == 2)
		n_tok[12] += 10;

	//[Talon Tales Custom - 2018-07-27 - Glorious Apocalipse 1095/Glorious Cleaver 1088/Glorious Flamberge 1077/Glorious Guitar 1092/Glorious Jamadhar 1091/Glorious Lariat 1093/Glorious Morning Star 1086/Glorious Spear 1081 - Every Refine Level gives APSD + 1%][Amor]
	if (EquipNumSearch(1095) || EquipNumSearch(1088) || EquipNumSearch(1077) || EquipNumSearch(1092) || EquipNumSearch(1091) || EquipNumSearch(1093) || EquipNumSearch(1086) || EquipNumSearch(1081) || EquipNumSearch(1087))
		n_tok[12] += n_A_Weapon_ATKplus;

	// Glorious Two-Handed Axe#1087 - [Every Refine Level] - ASPD + 2%
	n_tok[12] += 2 * EquipNumSearch(1087);

	//[Talon Tales Custom - 2018-07-28 - Glorious Gladius  +1% ASPD per refine to [SL/Ninja]] [Amor]
	if (EquipNumSearch(1076) && (n_A_JOB== 43 || n_A_JOB == 44))
		n_tok[12] += n_A_Weapon_ATKplus;

	//[Talon Tales Custom - 2018-07-28 - Glorious Hunter Bow - 5% ASPD (+2% per refine) for Rogue Class] [Amor]
	if (EquipNumSearch(1089) && n_A_JobSearch2() == 14)
		n_tok[12] += 5 + 2 * n_A_Weapon_ATKplus;
	
	// Brave Assassin Damascus - [Soul Linker] ASPD + 5%
	if (EquipNumSearch(897) && n_A_JOB == 43)
		n_tok[12] += 5;

	// Elemental Sword#939 + Elemental Boots#1819 [Every 2 Refine Levels] ASPD + 1%
	// When using two Elemental Swords, only the first Sword is used!
	if (EquipNumSearch(1819))
	{
		if (939 == n_A_Equip[0])
			n_tok[12] += Math.floor(n_A_Weapon_ATKplus / 2);
		else if (n_Nitou && 939 == n_A_Equip[1])
			n_tok[12] += Math.floor(n_A_Weapon2_ATKplus / 2);
	}

	//[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for ASPD] [Kato]
	for (i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];

		if (vME){
			if (121 <= vME && vME <= 129)
				n_tok[12] += parseInt(vME.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for ASPD] [NattWara]
	for (i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
		var vBE = tRO_BiolabWeaponEnchantment[i];

		if (vBE){
			if (121 <= vBE && vBE <= 129)
				n_tok[12] += parseInt(vBE.substr(-1));
		}
	}

	if (EquipNumSearch(1045) && SU_AGI >= 90)
		n_tok[12] += 5;

	// Defender#165
	if (SkillSearch(165))
		n_tok[12] -= 25 - SkillSearch(165) * 5;
	
	if ((EquipNumSearch(1774) && EquipNumSearch(1777)) || (EquipNumSearch(1775) && EquipNumSearch(1778)) || (EquipNumSearch(1776) && EquipNumSearch(1779)))
		n_tok[12] += n_A_BODY_DEF_PLUS;
	
	// Spammers Heaven Cocktail - ASPD +10%
	if (spammers_heaven_cocktail)
		n_tok[12] += 10;

	aspd_rate -= n_tok[12] * 10;
	attack_motion = Math.floor(attack_motion * aspd_rate / 1000);
	raw_aspd = (2000 - attack_motion) / 10;
	n_A_ASPD = Math.min(Math.floor(raw_aspd), 190);

	myInnerHtml("A_ASPD", n_A_ASPD + " (" + raw_aspd + ")", 0);

	n_A_ASPD = (200 - n_A_ASPD) / 50;

	n_Delay[1] = Math.floor(n_A_ASPD * 1000)/1000;
	if(n_A_ActiveSkill==17)
		n_Delay[1] = Math.floor(n_A_ASPD *75)/100;

	sandanDelay = 0;
	// Suiken#1390#8th Bonus, Champion Chen Card#625 - [Triple Attack#187] Ignores Delay
	if (SkillSearch(187) && n_A_ActiveSkill == 0 && (1390 != n_A_Equip[0] || SQI_Bonus_Effect.findIndex(x => x == 8) == -1) && !CardNumSearch(625)){
		sandanDelay = (1000 - n_A_AGI *4 - n_A_DEX *2) /1000;
		if(SkillSearch(301))
			sandanDelay += 0.3;
	}

	n_A_CAST = Math.max(0, 1 - n_A_DEX / 150);

	if(n_A_HEAD_DEF_PLUS >= 8 && EquipNumSearch(1279)) // Capricorn Diadem
		n_tok[73] -= 3;

	// Sagittarius Diadem
	if (n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1289))
		n_tok[73] -= 3;
	if (n_A_HEAD_DEF_PLUS >= 9 && EquipNumSearch(1289))
		n_tok[73] -= 2;
	
	if (n_A_JobSearch()==5 && CardNumSearch(454))
		n_tok[73] -= 15;
		
	if ((n_A_JOB==18 || n_A_JOB==32) && CardNumSearch(460))
		n_tok[73] -= 20;
		
	if (EquipNumSearch(750))
		n_tok[73] -= n_A_Weapon_ATKplus;
		
	if (n_A_card[8]==177)
		n_tok[73] -= n_A_HEAD_DEF_PLUS;
		
	if (n_A_Weapon_ATKplus >= 9 &&EquipNumSearch(1095))
		n_tok[73] -= 5;

	if (EquipNumSearch(1005)& EquipNumSearch(442))
		n_tok[73] -= (n_A_Weapon_ATKplus/2);

	//parade hat [refine >= 6] -5 cast time - [Loa] 2018-07-02
	if (EquipNumSearch(1036) && n_A_HEAD_DEF_PLUS >= 6)
		n_tok[73] -= 5;

	//custom Talon Tales Magical Booster & Staff of Piercing Combo
	if (EquipNumSearch(1430)& EquipNumSearch(645) && 10 == n_A_Weapon_ATKplus)
		n_tok[73] -= 10;

	//custom Talon Tales Lapine Staff
	if (EquipNumSearch(1486))
		n_tok[73] -= n_A_Weapon_ATKplus;

	//custom Talon Tales Halloween Midas Whisper
	if (SU_DEX >= 80 && EquipNumSearch(1526))
		n_tok[73] -= 5;

	n_tok[73] = Math.max(-100, n_tok[73]);
	
	bragi_cast_reduction = 1;
	if (n_A_PassSkill3[2]) // Poem of Bragi, 3 * Skill LV + Musical Lesson LV + DEX / 10;
		bragi_cast_reduction -= Math.min(1, (n_A_PassSkill3[2] * 3 + n_A_PassSkill3[32] + Math.floor(n_A_PassSkill3[22] / 10)) / 100);

	// DEX and Bragi do not reduce Tracking#430 cast time
	if (430 == n_A_ActiveSkill)
		n_A_CAST = 1 + n_tok[73] / 100;
	else
		n_A_CAST *= (1 + n_tok[73] / 100) * bragi_cast_reduction;

	// Skill cast time reduction script bonus
	skill_cast_reduction = 100;

	// Sharp Shooting#272 - Little Feather Hat & Falken Blitz combo#1489 - Reduce Sharp Shooting casting time by 15%
	if (n_A_ActiveSkill == 272 && EquipNumSearch(1489))
		skill_cast_reduction -= 15;
	
	//[Talon Tales Custom - 2019-10-30 - Heavy Sword - Decreases cast time of [Charge Attack] by 3% per refine
	if (n_A_ActiveSkill == 308 && EquipNumSearch(1680))
		skill_cast_reduction -= (3 * n_A_Weapon_ATKplus);
		
	// Storm Gust#131
	if (n_A_ActiveSkill == 131)
	{
		// Lacrima Stick#1169 - 8% cast reduction with Storm Gust
		if (n_A_Weapon_ATKplus == 10 && EquipNumSearch(1169))
			skill_cast_reduction -= 8;

		// custom Talon Tales Geffenia Water Book & Lacrima Stick combo: 2% cast reduction each shield refine
		if (EquipNumSearch(1521))
			skill_cast_reduction -= n_A_LEFT_DEF_PLUS*2;
	}

	/*
		Brave Carnage Katar
		[Refine level 7~10]
		Reduce cast time of [Meteor Assault] by 15%.
	*/
	if (n_A_Weapon_ATKplus >= 7 && n_A_ActiveSkill == 264 && EquipNumSearch(909))
		skill_cast_reduction -= 15;
	
	// RAG203#1787 - [Every Refine Level] - Reduce [Tracking#430] cast time by 3%.
	if (n_A_ActiveSkill == 430 && EquipNumSearch(1787))
		skill_cast_reduction -= 3 * n_A_Weapon_ATKplus;
	
	// Glorious equipment cast time reduction
	// Valorous Battle Strategy Book#912 - Sage/Professor, Decrease [Fire Bolt], [Cold Bolt], and [Lightning Bolt] cast times by 15%.] [Amor]
	if (n_A_JobSearch2() == 18 && (n_A_ActiveSkill == 56 || n_A_ActiveSkill == 51 || n_A_ActiveSkill == 54) && EquipNumSearch(912))
		skill_cast_reduction -= 15;

	// Glorious Apocalipse#1095 - Sage/Professor, Decrease [Fire Bolt], [Cold Bolt], and [Lightning Bolt] cast times by 20% plus 1% for every 2 refines.] [Amor]
	if (n_A_JobSearch2() == 18 && (n_A_ActiveSkill == 56 || n_A_ActiveSkill == 51 || n_A_ActiveSkill == 54) && EquipNumSearch(1095))
		skill_cast_reduction -= 20 + Math.floor(n_A_Weapon_ATKplus / 2);

	// Glorious Claymore#1080 - Gives -3% [Charge Attack] Casting Time] [Amor]
	if (n_A_ActiveSkill == 308 && EquipNumSearch(1080))
		skill_cast_reduction -= 3 * n_A_Weapon_ATKplus;

	// Glorious Claymore#1080 - Refine +6 > Gives -10% [Bowling Bash] Casting Time] [Amor]
	if (n_A_ActiveSkill == 76 && n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1080))
		skill_cast_reduction -= 10 * (n_A_Weapon_ATKplus - 5);

	// Glorious Fists#1097 - Gives -3% less casting time for [Finger Offensive] per refine] [Amor]
	if (n_A_ActiveSkill == 192 && EquipNumSearch(1097))
		skill_cast_reduction -= 3 * (n_A_Weapon_ATKplus);

	// Glorious Holy Avenger#1079 - [Grand Cross] -2% cast time per refine] [Amor] - Aegis Shield#1376 doubles the cast time reduction bonus
	if (n_A_ActiveSkill == 162 && EquipNumSearch(1079))
		skill_cast_reduction -= 2 * n_A_Weapon_ATKplus * (EquipNumSearch(1376) + 1);

	// Glorious Rifle#1100 - [Tracking] -2% cast time per refine] [Amor]
	if (EquipNumSearch(1100) && n_A_ActiveSkill == 430)
		skill_cast_reduction -= 2 * n_A_Weapon_ATKplus;

	// Scouter#1387#10th Bonus - Rifle equipped: 25% less cast time with [Tracking#430]
	if (18 == n_A_WeaponType && 1387 == n_A_Equip[3] && SQI_Bonus_Effect.findIndex(x => x == 10) > -1 && 430 == n_A_ActiveSkill)
		skill_cast_reduction -= 25;
	
	skill_cast_reduction -= StPlusCalc2(7000 + n_A_ActiveSkill);
	skill_cast_reduction = Math.max(0, skill_cast_reduction - StPlusCard(7000 + n_A_ActiveSkill));

	n_A_CAST *= skill_cast_reduction / 100;

	// Skill cast time reduction
	if (n_A_PassSkill2[13]) // Suffragium
		n_A_CAST *= (100 - 15 * n_A_PassSkill2[13]) /100;
	if (SkillSearch(322)) // Memorize#322
		n_A_CAST = n_A_CAST / 2;
	
	// Seductive Bathory Cocktail - Cast time -25% (not stacking)
	if (seductive_bathory_cocktail)
		n_A_CAST *= 0.75;

	if (n_A_Weapon_ATKplus >= 9 &&EquipNumSearch(1095))
		n_tok[74] += 5;
	if (EquipNumSearch(936))
		n_tok[74] += (n_A_Weapon_ATKplus * 3 / 2);

	//custom Talon Tales Magical Booster & Staff of Piercing Combo
	if (10 == n_A_Weapon_ATKplus && EquipNumSearch(1430) && EquipNumSearch(473))
		n_tok[74] += 10;

	//[Talon Tales Custom - 2018-07-27 - Glorious Apocalipse/Glorious Arc Wand - Every /2 upgrade gives after-cast delay -1%] [Amor]
	if (EquipNumSearch(1095) || EquipNumSearch(1084))
		n_tok[74] += (1 * Math.floor(n_A_Weapon_ATKplus / 2));

	//[Talon Tales Custom - 2018-07-27 - Glorious Bloody Roar/Glorious Guitar/Glorious Lariat - Every Upgrade gives after-cast delay -1%] [Amor]
	if (EquipNumSearch(1090) || EquipNumSearch(1092) || EquipNumSearch(1093))
		n_tok[74] += n_A_Weapon_ATKplus;
	
	/* 	Invective Robe#1818
		[Non-Hunter Class][Every Refine Level] - Pierce 1% of Demi-human, Demon and Undead Monster Defense.
		[Extended Class] 	- Enable use of level 1 [Attention Concentrate].
							- Reduce Aftercast Delay by 20%.
	*/
	if (EquipNumSearch(1818))
	{
		if (n_A_JobSearch() != 4)
		{
			n_tok[181] += n_A_BODY_DEF_PLUS;
			n_tok[186] += n_A_BODY_DEF_PLUS;
			n_tok[187] += n_A_BODY_DEF_PLUS;
		}
		
		if (n_A_JobSearch() == 41 || 20 == n_A_JOB || 44 == n_A_JOB || 45 == n_A_JOB)
			n_tok[74] += 20;
	}

	// Skill delay reduction script bonus
	skill_delay_reduction = StPlusCalc2(8000 + n_A_ActiveSkill);
	skill_delay_reduction += StPlusCard(8000 + n_A_ActiveSkill);
	
	// Altea & Ares#1784 - [Every Refine Level] - 1% less aftercast delay with [Rapid Shower#428]
	if (428 == n_A_ActiveSkill && EquipNumSearch(1784))
		skill_delay_reduction += n_A_Weapon_ATKplus;
	
	// Huuma Swirling Petal#1770 - [Every Refine Level] - 2% less aftercast delay with [Throw Huuma Shuriken#396]
	if (396 == n_A_ActiveSkill && EquipNumSearch(1770))
		skill_delay_reduction += 2 * n_A_Weapon_ATKplus;
	
	n_tok[74] = Math.floor(100 - (100 - n_tok[74]) * (1 - skill_delay_reduction / 100));

	musical_lesson_lv = n_A_PassSkill3[2]; // Musical Lesson
	if (musical_lesson_lv)
	{
		// custom Talon Tales Poem of Bragi after cast delay
		// "we strongly think that the stacking of Bragi with items that grant ACD reduction is something to avoid" - GM Team, applied only to PvM
		if (n_A_PassSkill3[45]) // PvP Mode
		{
			pvp_bragi_delay_reduction = musical_lesson_lv * 3 + 20 * Math.floor(musical_lesson_lv / 10) + n_A_PassSkill3[32] * 2 + Math.floor(n_A_PassSkill3[29] / 5) + bragi_bonus;
			n_tok[74] = Math.floor(100 - (100 - n_tok[74]) * (1 - pvp_bragi_delay_reduction / 100));
		}
		else // PvM Mode
			n_tok[74] = musical_lesson_lv * 3 + n_A_PassSkill3[32] * 2 + Math.floor(n_A_PassSkill3[29] / 5) + bragi_bonus; // Override all previous acd reduction bonus
	}
	
	n_tok[74] = Math.min(100, n_tok[74]);

	n_A_HPR = Math.floor(n_A_VIT /5) + Math.floor(n_A_MaxHP /200);
	if(n_A_HPR < 1)
		n_A_HPR = 1;
	w = 100;
	w += n_tok[75];
	if(SU_LUK >= 77)
		w += 100 * CardNumSearch(221);
	if(n_A_JobSearch()==41 && EquipNumSearch(672))
		w += 3;
	if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407))
		w += 5;
	if(n_A_PassSkill8[18])
		w += 3;
	//custom Talon Tales Knit Rabbit Ear Hat
	if(EquipNumSearch(1429) && SU_LUK > 55)
		w += 10;

	//[Custom Talon Tales - 2018-06-02 - Aegir Helm + Cloak - Increases natural HP recovery by 5% per refinement rate of Aegir Cloak.] [Kato/Nattwara]
	if(EquipNumSearch(1555))
		w += 5 * n_A_SHOULDER_DEF_PLUS;

	// //[Custom Talon Tales - 2018-07-17 - Nightmare Verit - For every 2 refines, increases the HP recovery chance by an additional 1%] [Kato]
	// if(CardNumSearch(547)) {
	// 		w += 1 * Math.floor(n_A_SHOES_DEF_PLUS / 2);
	// }

	n_A_HPR = Math.floor(n_A_HPR * w /100);

	if(n_A_IJYOU[2])
		n_A_HPR = 0;

	myInnerHtml("A_HPR",n_A_HPR,0);

	n_A_SPR = Math.floor(n_A_INT /6) + Math.floor(n_A_MaxSP /100) +1;

	w=100;

	w += SkillSearch(269) *3;

	// Menblatt Wing Manteau#1696 - [Every Refine Level] SP Recovery + 3%
	n_tok[76] += 3 * n_A_SHOULDER_DEF_PLUS * EquipNumSearch(1696)

	// Dance Shoes#1314 - [Every Refine Level] SP Recovery + 3%
	n_tok[76] += 3 * n_A_SHOES_DEF_PLUS * EquipNumSearch(1314);
	
	w += n_tok[76];

	if(SU_LUK >= 77)
		w += 100 * CardNumSearch(221);
	if(n_A_JobSearch()==41 && EquipNumSearch(673))
		w += 3;
	if(n_A_HEAD_DEF_PLUS <= 4 && n_A_card[8]==179)
		w += 5;
	if(n_A_card[9]==179)
		w += 5;
	if(n_A_card[16]==179)
		w += 5;
	if(n_A_card[17]==179)
		w += 5;
	if(n_A_card[18]==179)
		w += 5;
	if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407))
		w += 5;
	if(EquipNumSearch(1119) && n_A_JobSearch()==5)
		w += 5;
	if(n_A_PassSkill8[18])
		w += 3;
	//custom Talon Tales Knit Rabbit Ear Hat
	if(EquipNumSearch(1429) && SU_LUK > 55)
		w += 10;

	n_A_SPR = Math.floor(n_A_SPR * w /100);

	if(n_A_INT>=120)
		n_A_SPR += Math.floor((n_A_INT-120)/2) +4;

	if(n_A_IJYOU[2])
		n_A_SPR = 0;

	myInnerHtml("A_SPR",n_A_SPR,0);

	// Bonus not applied on melee skills, can be reduced to the usage of Bowling Bash#76 skill
	if(ArrowOBJ[n_A_Arrow][2]=="Holy Arrow" && n_A_ActiveSkill != 76)
		n_tok[36] += 5;
	if(SkillSearch(234))
		n_tok[39] += SkillSearch(234) *4;

	if(EquipNumSearch(1428) && n_A_HEAD_DEF_PLUS > 5)
		n_tok[37] += 2*(n_A_HEAD_DEF_PLUS-5);

	//custom Talon Tales Imrpoved Munak Hat: If refine > 6 increase damage against Undead monster by 10% - [Loa] - 2018-06-07
	if(EquipNumSearch(1649) && n_A_HEAD_DEF_PLUS > 6){
		n_tok[31] += 10;
	}

	//custom Talon Tales Imrpoved Bongun Hat: If refine > 6 increase damage against Demon monster by 10% - [Loa] - 2018-06-07
	if(EquipNumSearch(1650) && n_A_HEAD_DEF_PLUS > 6){
		n_tok[36] += 10;
	}
	
	if (n_A_PassSkill8[35]) // Greater Agimat of Ancient Spirit food
		n_tok[36] += 10;
	
	// Zakudam Card#595 [Monk Class] Reduce DemiHuman monster damage to 10%
	if(CardNumSearch(595) && n_A_JobSearch2() == 15)
		n_tok[37] -= 10;

	if(EquipNumSearch(628) && n_A_Arrow == 4) // Earthen Bow#628
	{
		n_tok[25] += 25;
		n_tok[139] += 10;
	}
	if(EquipNumSearch(626) && n_A_Arrow == 2)
		n_tok[25] += 25;
	if(EquipNumSearch(627) && n_A_Arrow == 5)
		n_tok[25] += 25;
	if(EquipNumSearch(629) && n_A_Arrow == 6)
		n_tok[25] += 25;
	if(EquipNumSearch(630) && n_A_Arrow == 10)
		n_tok[25] += 50;
	if(EquipNumSearch(101) && n_A_Arrow == 17)
		n_tok[25] += 50;
	//custom TalnRO Elven Bow + Elven Arrow: +50% dmg
	if(EquipNumSearch(1477) && n_A_Arrow == 18)
		n_tok[25] += 50;
	if(n_A_HEAD_DEF_PLUS >= 9 &&EquipNumSearch(1288)){
		n_tok[25] += 5;}//sagittarius crown

	//custom Talon Tales Evil Marching Hat: if refine rate >=9 +5% ranged damage
	if(n_A_HEAD_DEF_PLUS >= 9 &&EquipNumSearch(1539))
		n_tok[25] += 5;
	
	// Brindle Eel [Rental]#1807 - Malang Snow Crab [Rental]#1809 - [Base Level  > 94] - Ranged physical attack damage + 10%
	if (n_A_BaseLV > 94 && (EquipNumSearch(1807) || EquipNumSearch(1809)))
		n_tok[25] += 10;

	//[Custom Talon Tales - 2018-07-09 Ancient Gold Adornment 5% Range Physical Damage] [NattWara]
	if(EquipNumSearch(1663)){
		var wHPVS = n_A_JobSearch();
		if(wHPVS==4){
			n_tok[25] += 5;
		}
	}
	
	/* 	Apis Axe#1816
		[Refine Level +7 or Higher] Increases damage with ranged attacks by 5%.
		[Refine Level +9 or Higher] Increases damage with ranged attacks by 5%.
	*/
	if (1816 == n_A_Equip[0])
		n_tok[25] +=  5 * (Math.floor(n_A_Weapon_ATKplus / 7) + Math.floor(n_A_Weapon_ATKplus / 9));
	if (n_Nitou && 1816 == n_A_Equip[1])
		n_tok[25] +=  5 * (Math.floor(n_A_Weapon2_ATKplus / 7) + Math.floor(n_A_Weapon2_ATKplus / 9));
	
	//[Custom Talon Tales - 2018-06-01 - Palace Guard if refine rate >=7 add -1% ranged reduction] [Kato]
	if (EquipNumSearch(1545))
		n_tok[78] += n_A_HEAD_DEF_PLUS - 5;

	//[Custom Talon Tales 2018-06-15 - Malandgo Enchantment for Expert Archer] [Kato]
	for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];
		if(vME >= 251 && vME <= 256) {
				n_tok[25] += 2 * parseInt(vME.substr(-1));
		}
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for Expert Archer] [NattWara]
	for(i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
		var vBE = tRO_BiolabWeaponEnchantment[i];
		if(vBE >= 251 && vBE <= 253) {
				n_tok[25] += 2 * parseInt(vBE.substr(-1));
		}
	}

	//Custom Talon Tales - 2018-06-07 - Lord of the Dead Helm [1] + Abysmal Knight Card - +5% damage on boss monsters  [Nattwara]
	if(EquipNumSearch(1658) && CardNumSearch(31))
		n_tok[26] += 5;

	//Custom Talon Tales - 2018-06-07 - Lord of the Dead Helm [1] - Refine 5+ +1% more damage on boss monsters for every refine.  [Nattwara]
	if(EquipNumSearch(1658) && n_A_HEAD_DEF_PLUS > 4)
		n_tok[26] += n_A_HEAD_DEF_PLUS;

	if(n_A_HEAD_DEF_PLUS >= 9 && EquipNumSearch(1285)){
		n_tok[80] += 3;}//libra diadem
	if(n_A_JOB==14 || n_A_JOB==28)
		n_tok[80] += 10 * CardNumSearch(479);

	//custom Talon Tales Lady Tanee Card: +1% ATK per 8 base VIT
	if(CardNumSearch(409))
		n_tok[80] += Math.floor(SU_VIT / 8);

	//custom Talon Tales Little Feather Hat: if combined with Sharp Arrow +5% critical damage
	if(EquipNumSearch(1488) && n_A_Arrow==15)
		n_tok[70] += 5;
	//custom Talon Tales Little Feather Hat: if refine rate >=7 additional +5% critical damage
	if(EquipNumSearch(1488) && n_A_HEAD_DEF_PLUS >= 7)
		n_tok[70] += 5;
	//custom Talon Tales Evil Marching Hat: if refine rate >=7 +10% critical damage
	if(EquipNumSearch(1539) && n_A_HEAD_DEF_PLUS >= 7)
		n_tok[70] += 10;

	// Brave Battle Strategy Book - [Refine level 7-10] - Increases critical damage by 20%.
	if (n_A_Weapon_ATKplus >= 7 && EquipNumSearch(911))
		n_tok[70] += 20;

	//custom Talon Tales Improved Joker Jester: If refine rate >6 +5% critical damage - [Loa] - 2018-06-07
	if(EquipNumSearch(1647) && n_A_HEAD_DEF_PLUS > 6){
		n_tok[70] += 5;
	}
  //[Talon Tales Custom 2018-07-25 - Assaulter Lance + 20% Critical Damage for Crusader/Paladin] [Amor]
	if(EquipNumSearch(904) && n_A_JobSearch2() == 13){
		n_tok[70] += 20;
	}
	//[Talon Tales Custom - 2018-07-28 - Glorious Hunter Bow - For every refine, increases Critical damage by 2% for Archer Class] [Amor]
	if (EquipNumSearch(1089) && n_A_JobSearch() == 4) {
		n_tok[70] += (2 * n_A_Weapon_ATKplus);
	}

	// Petal Card#606 - [Every 10 Base LUK] - Critical Attack + 2%
	n_tok[70] += 2 * Math.floor(SU_LUK / 10) * CardNumSearch(606);

	if(CardNumSearch(452) && n_A_JobSearch()==3){
		n_tok[51] += 30;
		n_tok[56] += 30;
	}
	if(EquipNumSearch(1428) && n_A_HEAD_DEF_PLUS > 5)
		n_tok[57] += 2*(n_A_HEAD_DEF_PLUS-5);
	if(n_A_PassSkill2[14] && n_A_JOB != 13 && n_A_JOB != 27)
		n_tok[56] += n_A_PassSkill2[14] * 5;
	if(SkillSearch(234))
		n_tok[59] += SkillSearch(234) *4;
	for(var i=971;i<=977;i++){
		if(EquipNumSearch(i)){
			n_tok[50] -= 200;
			n_tok[51] -= 200;
			n_tok[52] -= 200;
			n_tok[53] -= 200;
			n_tok[54] -= 200;
			n_tok[55] -= 200;
			n_tok[56] -= 200;
			n_tok[58] -= 200;
			n_tok[59] -= 200;
		}
	}
	//Orc Hero Headdress [For Every Refine > 5] Physical Damage against Demi-Human monsters + 1%, Damage from Demi-Human monster - 2% - [Loa] - 2018-07-03
	if(EquipNumSearch(1142) && n_A_HEAD_DEF_PLUS > 5){
		n_tok[37] += n_A_HEAD_DEF_PLUS - 5;
		n_tok[57] += (n_A_HEAD_DEF_PLUS - 5) * 2;
	}

	// Valorous Battlefield Morning Star#907 - [Monk Class] - Decreases physical attack against DemiHuman monster by 20%.
	if( EquipNumSearch(907) && n_A_JobSearch2() == 15)
		n_tok[37] -= 20;

	/*
		Assaulter Lance
		[Crusader Class]
		Reduce damage received from DemiHuman race monsters by 15% instead of 20%.
	*/
	if(EquipNumSearch(904) && n_A_JobSearch2() == 13) {
		n_tok[57] -= 5;
	}
	
	// Brave Battle Crossbow#914 - [Refine Level 7-10] - Increases resistance against Demi-Human race by 10%.
	if (n_A_Weapon_ATKplus >= 7 && EquipNumSearch(914))
		n_tok[57] += 10;

	//[Talon Tales Custom - 2018-07-26 - Glorious Claymore/Glorious Cleaver/Glorious Flamberge/Glorious Gladius/Glorious Grenade Launcher/ Glorious Tablet - +1% Inceases physical attack Demi-human damage per refine] [Amor]
	if(EquipNumSearch(1080) || EquipNumSearch(1088) || EquipNumSearch(1077) || EquipNumSearch(1076) || EquipNumSearch(1103) || EquipNumSearch(1094)) {
		n_tok[37] += n_A_Weapon_ATKplus;
	}
	//[Talon Tales Custom - 2018-07-26 - Glorious Grenade Launcher/Glorious Rifle/Glorious Shotgun - +2% Inceases physical attack Demi-human damage per refine] [Amor]
	if (EquipNumSearch(1103) || EquipNumSearch(1100) || EquipNumSearch(1102)) {
		n_tok[37] += (2 * n_A_Weapon_ATKplus);
	}

	//[Custom Talon Tales - 2018-06-02 - Aegir Helm + Armor Combo - 1% less damage from Fish race monster for each refine] [Kato/Nattwara]
	if(EquipNumSearch(1556))
		n_tok[55] += n_A_BODY_DEF_PLUS;

	//Custom Talon Tales - 2018-06-07 - Enhanced Bone Helm [1] - 1% less damage Neutral element attack for each refine past +4 until +8 [Nattwara/Loa]
	if(EquipNumSearch(1656) && n_A_HEAD_DEF_PLUS > 4)
		n_tok[60] += Math.min(n_A_HEAD_DEF_PLUS-4,4);

	//Custom Talon Tales - 2018-06-07 - Enhanced Corsair [1] - 1% less damage Neutral element attack if refine +8 or above [Nattwara]
	if(EquipNumSearch(1657) && (n_A_HEAD_DEF_PLUS > 7))
		n_tok[60] += 1;
	
	// Bankruptcy Hat#1725 + Bankruptcy Mask#1726 - [Every Refine Level After +2] on Bankruptcy Hat - [Neutral] element resistance + 1%
	if (EquipNumSearch(1727)) // Combo#1727
		n_tok[60] += Math.max(n_A_HEAD_DEF_PLUS - 2, 0);

	//Custom Talon Tales - 2018-06-07 - Lord of the Dead Helm [1] + Abysmal Knight Card - Refine 6+ Receive 1% more damage from all monsters for every refine.  [Nattwara]
	if(EquipNumSearch(1658) && CardNumSearch(31) && n_A_HEAD_DEF_PLUS > 5) {
		n_tok[77] -= n_A_HEAD_DEF_PLUS;
		n_tok[79] -= n_A_HEAD_DEF_PLUS;
	}

	if(EquipNumSearch(737))
		n_tok[60] += n_A_SHOULDER_DEF_PLUS * 3;
	if(n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(403))
		n_tok[60] += 5;
	if(SkillSearch(150)){
		n_tok[60] += SkillSearch(150);
		n_tok[63] += 4 * SkillSearch(150);
	}
	if(SkillSearch(156))
		n_tok[66] += 5 * SkillSearch(156);
	if(n_A_PassSkill2[14] && n_A_JOB != 13 && n_A_JOB != 27)
		n_tok[66] += 5 * n_A_PassSkill2[14];
	if(n_A_PassSkill3[7]){
		for(i=61;i<=69;i++)
			n_tok[i] += 55 + 5 * n_A_PassSkill3[7];
		for(i=150;i<=159;i++)
			n_tok[i] += 10 * n_A_PassSkill3[7];
	}
	if(n_A_PassSkill7[11]){
		n_tok[61] += 20;
		n_tok[64] -= 15;
	}
	if(n_A_PassSkill7[12]){
		n_tok[62] += 20;
		n_tok[63] -= 15;
	}
	if(n_A_PassSkill7[13]){
		n_tok[63] += 20;
		n_tok[61] -= 15;
	}
	if(n_A_PassSkill7[14]){
		n_tok[64] += 20;
		n_tok[62] -= 15;
	}

	// Preschool Hat#1739 - [Refine Level > 5] Fire resistance + 5%
	if (EquipNumSearch(1739) && n_A_HEAD_DEF_PLUS > 5)
		n_tok[63] += 5; 

	if(EquipNumSearch(624))
		n_tok[191] += n_A_Weapon_ATKplus;

	//custom Talon Tales Magical Booster
	if(EquipNumSearch(1430) && EquipNumSearch(1228)){
		if(n_A_HEAD_DEF_PLUS >= 5)
			n_tok[79] -= 5;
	}

	if(SkillSearch(421))
		n_tok[78] += 20;

	// Glorious Two-handed Axe#1087 - [Every Refine Level +6~10] - 2% Range Resistance.
	if (EquipNumSearch(1087) && n_A_Weapon_ATKplus >= 6)
		n_tok[78] += 2 * (n_A_Weapon_ATKplus - 5);

	/*
		Speedy Recovery Wand
		[Refine level 8-10]
		Reduces ranged damage by 10%
		Increases SP cost by 10%
	*/
	if(EquipNumSearch(920) && n_A_Weapon_ATKplus >= 8) {
		n_tok[78] += 10;
		n_tok[72] += 10;
	}
	
	/*
		Aunoe Card#583 + Isilla Card#472 Combo
		[If Vanberk Card#471 is not equipped][Vanilla Mode] Long Range Resist + 10%
		Fanat Card#585 + Vanberk Card#471 Combo
		[If Isilla Card#472 is not equipped][Vanilla Mode] Long Range Resist + 10%
	*/
	if (document.calcForm.vanilla.checked && ((CardNumSearch(583) && CardNumSearch(472) && !CardNumSearch(471))
		|| (CardNumSearch(585) && CardNumSearch(471) && !CardNumSearch(472))))
		n_tok[78] += 10;
	
	/*
		Cobalt Mineral#597 + Mineral#184 Combo
		[Knight, Blacksmith, Assassin][If Horn Card#62 is not equipped][Vanilla Mode] Long Range Resist + 20%
	*/
	if (document.calcForm.vanilla.checked
		&& (n_A_JobSearch2() == 7 || n_A_JobSearch2() == 8 || n_A_JobSearch2() == 12)
		&& CardNumSearch(597) && CardNumSearch(184) && !CardNumSearch(62))
		n_tok[78] += 20;

	// Maiden Hat#1628 - [Every Refine Level Above 6] Heal effectiveness incresed by 1% [Loa] - 2018-06-25
	if(n_A_HEAD_DEF_PLUS > 6 && EquipNumSearch(1628)){
		n_tok[91] += n_A_HEAD_DEF_PLUS - 6;
		n_tok[93] += n_A_HEAD_DEF_PLUS - 6;
		n_tok[94] += n_A_HEAD_DEF_PLUS - 6;
	}
	
	// [Priest Link#446] adds heal 20% more with [Heal] and 15% with [Sanctuary]
	if (SkillSearch(446))
	{
		n_tok[91] += 20;
		n_tok[94] += 15;
	}

	//[Custom Talon Tales - 2018-07-09 Ancient Gold Adornment - Inrease Heal Effectiveness by 7% (Exclude Sanctuary)] [NattWara]
	if(EquipNumSearch(1663)){
		var wHPVS = n_A_JobSearch();
		if(wHPVS==3 || wHPVS==5){
			n_tok[91] += 7;
		}
	}

	//[Custom Talon Tales - 2018-07-13 Love Guard - If refine 7+ Inrease Effectiveness of Heal, Potion Pitcher, and Sanctuary by 2%] [NattWara]
	if(n_A_HEAD_DEF_PLUS > 6 && EquipNumSearch(1667)){
		n_tok[91] += 2;
		n_tok[93] += 2;
		n_tok[94] += 2;
	}

	//[Custom Talon Tales - 2018-07-27 Elite Engineer Armor - Effectiviness of Potion Pitcher 10%] [Amor]
	if(EquipNumSearch(973)){
		n_tok[94] += 10;
	}
	//[Custom Talon Tales - 2018-07-29 Glorious Staff of Recovery - Effectiviness of Potion Pitcher/Heal 1% per refine] [Amor]
	if(EquipNumSearch(1085)){
		n_tok[91] += n_A_Weapon_ATKplus;
		n_tok[93] += n_A_Weapon_ATKplus;
		n_tok[94] += n_A_Weapon_ATKplus;
	}

	//[Custom Talon Tales - 2018-07-27 Glorious Arc Wand - Every 2 refine 1% MATK for demi-human] [Amor]
	if (EquipNumSearch(1084))
		n_tok[177] += (1 * Math.floor(n_A_Weapon_ATKplus/2));

	if(EquipNumSearch(1161)) {
		n_tok[91] += SkillSearch(23);
		n_tok[94] += SkillSearch(23);
	}
	
	if(EquipNumSearch(534)){
		wSPVS = n_A_JobSearch();
		if(wSPVS==1 || wSPVS==2 || wSPVS==6)
			n_tok[151] += 50;
		if(wSPVS==3 || wSPVS==4 || wSPVS==5)
			n_tok[156] += 50;
	}
	//custom Talon Tales Recovery Light bHealPower refine * 3
	if(EquipNumSearch(1511)){
		n_tok[91] += Math.floor(n_A_Weapon_ATKplus * 3);
		n_tok[94] += Math.floor(n_A_Weapon_ATKplus * 3);
	}
	
	// Staff of Recovery - bHealPower refine * 1.5
	if(EquipNumSearch(644)){
		n_tok[91] += Math.floor(n_A_Weapon_ATKplus * 1.5);
		n_tok[94] += Math.floor(n_A_Weapon_ATKplus * 1.5);
	}
	
	// Bayani Buwaya Skin Clothes#1542, Buwaya Skin Clothes#1012
	// [Every 3 Refines] - Received heal and healing item effectiveness increased by 1%
	if (EquipNumSearch(1542) || EquipNumSearch(1012))
	{
		healing_bonus = Math.floor(n_A_SHOULDER_DEF_PLUS / 3);
		n_tok[92] += healing_bonus;
		n_tok[95] += healing_bonus;
		n_tok[199] += healing_bonus;
		n_tok[218] += healing_bonus;
	}
	
	// Peace and Happiness Proof#1754
	if (EquipNumSearch(1754))
	{
		// [Every Refine > 2] Increase effectiveness of healing items by 1%
		n_tok[218] += n_A_HEAD_DEF_PLUS - 2;
		// [Every Refine > 2] Reduces damage from DemiHuman monsters by 1%
		n_tok[57] += n_A_HEAD_DEF_PLUS - 2;
	}

	if(EquipNumSearch(828)){
		n_tok[151] += 2 * n_A_HEAD_DEF_PLUS;
		n_tok[152] += 2 * n_A_HEAD_DEF_PLUS;
		n_tok[159] += 2 * n_A_HEAD_DEF_PLUS;
	}
	if(CardNumSearch(176)){
		if(SU_AGI >= 90){
			n_tok[151] += 30 * CardNumSearch(176);
			n_tok[156] += 30 * CardNumSearch(176);
		}
		if(SU_VIT >= 80){
			n_tok[155] += 50 * CardNumSearch(176);
			n_tok[159] += 50 * CardNumSearch(176);
		}
	}

	n_A_zokusei = new Array();
	for(i=0;i<=9;i++){
		n_A_zokusei[i] = zokusei[n_A_BodyZokusei * 10 +1][i] * 100;
		n_A_zokusei[i] = n_A_zokusei[i] - Math.floor(n_A_zokusei[i] * n_tok[60+i]) / 100;
	}

	// Replace [Eska] effect with 20% MDEF Reduction on the target for 10 seconds.
	if (eska_mdef_reduction)
		n_tok[295] += 20;

	if(EquipNumSearch(645))
		n_tok[295] += 10 + n_A_Weapon_ATKplus;
	if(n_A_WeaponType==9)
		n_tok[295] += 2 * CardNumSearch(466);
	if(EquipNumSearch(936))
		n_tok[295] += (n_A_Weapon_ATKplus * 1);
	if(n_B[19]==1 && EquipNumSearch(1228)){
		if(n_A_HEAD_DEF_PLUS >= 6)
			n_tok[297] += n_A_HEAD_DEF_PLUS;
	}
	//custom Talon Tales Magical Booster & Southern Cross Combo
	if(n_B[19]==1 && EquipNumSearch(1430) && EquipNumSearch(1228)){
		if(n_A_HEAD_DEF_PLUS >= 5)
			n_tok[297] += 1;
		if(n_A_HEAD_DEF_PLUS >= 7)
			n_tok[297] += 1;
	}
	if(n_B[19] == 0)
		n_tok[295] += n_tok[296];
	if(n_B[19] == 1)
		n_tok[295] += n_tok[297];
	
	// Professor Card#617 - [Sage Class] - Pierce MDEF by 2%
	if (n_A_JobSearch2() == 18)
		n_tok[295] += 2 * CardNumSearch(617);
	
	/*
		Detecting Staff#1735 - Ignores 10% MDEF of Kiel Dungeon Monsters (except Alice), Juperos Ruins Monsters, and Guardians
		[Every Refine Level] Ignore MDEF % increased by 1%"
	*/
	if (EquipNumSearch(1735) && (IsAKielDungeonMonster() || IsAJuperosRuinsMonster()))
		n_tok[295] += 10 + n_A_Weapon_ATKplus;
	
	/*
		Shadow Staff#1713 - [Every Refine Level]
		1% MDEF pierce against Demon Race.
		Add a 0.2% chance of auto-casting [Sight Blaster] on yourself when using magic attacks.
	*/
	if (EquipNumSearch(1713)) {
		n_tok[316] += n_A_Weapon_ATKplus;
		AutoSpellSkill[143][4] = n_A_Weapon_ATKplus * 0.2;
	}

	n_tok[70] += n_tok[320+n_B[2]];

	if(EquipNumSearch(535)){
		var wVM = n_A_JobSearch();
		if(wHPVS==1 || wHPVS==2 || wHPVS==6){
			n_tok[71] += 5;
			n_tok[71] += n_A_SHOULDER_DEF_PLUS * 2;
		}
	}

	//[Custom Talon Tales - 2018-06-05 - Detale + Aegir Set (all of them) combo, immunity to Freeze [Kato.]
	if(CardNumSearch(532) && EquipNumSearch(1557)) {
			n_tok[152] = 100;
	}
	
	/*
		Hell Apocalypse#599 + Apocalypse#225 Combo
		[If Apocalypse Card Equipped on Meteor Plate] Gain protection from the Freeze.
	*/
	if(CardNumSearch(599) && CardNumSearch(225) && EquipNumSearch(686))
			n_tok[152] = 100;

	//[Custom Talon Tales = 2018-06-05 - Parus Card adds 2% for Acolyte-based jobs] [Kato]
	if(CardNumSearch(536) && (n_A_JOB == 3 || n_A_JOB == 9 || n_A_JOB == 23 || n_A_JOB == 15 || n_A_JOB == 33)) {
		n_tok[91] += 1 * Math.floor(n_A_HEAD_DEF_PLUS/2);
	}
	//[Talon Tales Custom - Assaulter Lance  + 25% DEF Bypass on Demi-Human for Knight/ Lord Knight] [Amor]
	if(EquipNumSearch(904) && n_A_JobSearch2() == 7){
		n_tok[187] += 25;
	}
	//[Talon Tales Custom - Glorious Cleaver 1088/Glorious Flamberge 1077/Glorious Gatiling Gun 1101/Glorious Guitar 1092/Glorious Lariat 1093/Glorious Rifle 1100/Glorious Shotgun 1102/Glorious Spear 1081/Glorious Tablet 1094/Glorious Two Handed Axe 1087 + 1% DEF Bypass for every upgrade] [Amor]
	if(EquipNumSearch(1088) || EquipNumSearch(1077) || EquipNumSearch(1101) || EquipNumSearch(1092) || EquipNumSearch(1093) || EquipNumSearch(1100) || EquipNumSearch(1102) || EquipNumSearch(1081) || EquipNumSearch(1094) || EquipNumSearch(1087)){
		n_tok[187] += n_A_Weapon_ATKplus;
	}
	//[Talon Tales Custom - Glorious Lance - +1% DEF Bypass if Knight/Lord Knight] [Amor]
	if(EquipNumSearch(1082) && n_A_JobSearch2() == 7){
		n_tok[187] += n_A_Weapon_ATKplus;
	}

	/*
		Glorious Hunter Bow
		[Refine Rate 8-10]
		Increases physical attack against DemiHuman race by 10%.
	*/
	if (EquipNumSearch(1089) && n_A_Weapon_ATKplus >= 8) {
		n_tok[37] += 10;
	}
	/*
		Glorious Revolver
		[Refine Rate 8-10]
		Adds 5% additional defense bypassing on DemiHuman monsters.
	*/
	if (EquipNumSearch(1099) && n_A_Weapon_ATKplus >= 8) {
		n_tok[187] += 5;
	}

	// Soldier Gatling Gun#927 - [Refine level 7-10] - Increase damage inflicted on Medium size monsters by 20.
	if (EquipNumSearch(927) && n_A_Weapon_ATKplus >= 7)
		n_tok[28] += 20;

	// Ice Pick[0]#388, Ice Pick[1]#607 - Decreases physical damage against players by 30%
	if (Taijin && (EquipNumSearch(388) || EquipNumSearch(607)))
		n_tok[37] -= 30;
	
	// RAG203#1787 - Decreases physical damage against players by 75%
	if (Taijin && EquipNumSearch(1787))
		n_tok[37] -= 75;

	/*[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for Spell Element] [Kato]
		Well I couldn't find a n_tok for magical damage based on element.
		Since we don't have it, I will separate the skills by element (skills.js) and apply the magical damage for all races [170-179]
		*** Snap, the math was bugus, the only way I found here was to keep the modifier that was here and add the new one
	*/
	var eTypes = [0,0,0,0,0]; // 0 Neural, 1 Water, 2 Earth, 3 Fire, 4 Wind
	var aMSnoEle = [373,374,375]; // Magical skills without proper element (will change depending on n_A_Weapon_zokusei)
	for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];
		if(vME >= 261 && vME <= 267) {
			switch(vME.substr(-1)){
				case '1' : eTypes[3] += 2; break;
				case '2' : eTypes[1] += 2; break;
				case '3' : eTypes[4] += 2; break;
				case '4' : eTypes[2] += 2; break;
				case '5' : eTypes[3] += 4; break;
				case '6' : eTypes[1] += 5; break;
				case '7' : eTypes[4] += 6; break;
			}

			for(k=1; k<5; k++) {
				if(TRO_MAGICALSKILL_ELEMENTS[k].indexOf(n_A_ActiveSkill) != -1){
					for(j=0; j<10; j++) {
						n_tok[170 + j] = ((n_tok[170 + j] + 100) * (100 + eTypes[k]) / 100) - 100; // ***
					}
				}
			}
			if(aMSnoEle.indexOf(n_A_ActiveSkill) != -1 && n_A_Weapon_zokusei <= 5){
				for(j=0; j<10; j++) {
					n_tok[170 + j] = ((n_tok[170 + j] + 100) * (100 + eTypes[n_A_Weapon_zokusei]) / 100) - 100; // ***
				}
			}
		}
	}
	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for Spell Element] [NattWara]
	var eTypes = [0,0,0,0,0]; // 0 Neural, 1 Water, 2 Earth, 3 Fire, 4 Wind
	var aMSnoEle = [373,374,375]; // Magical skills without proper element (will change depending on n_A_Weapon_zokusei)
	for(i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
		var vBE = tRO_BiolabWeaponEnchantment[i];
		if(vBE >= 261 && vBE <= 264) {
			switch(vBE.substr(-1)){
				case '1' : eTypes[3] += 2; break;
				case '2' : eTypes[1] += 2; break;
				case '3' : eTypes[4] += 2; break;
				case '4' : eTypes[2] += 2; break;
			}

			for(k=1; k<5; k++) {
				if(TRO_MAGICALSKILL_ELEMENTS[k].indexOf(n_A_ActiveSkill) != -1){
					for(j=0; j<10; j++) {
						n_tok[170 + j] = ((n_tok[170 + j] + 100) * (100 + eTypes[k]) / 100) - 100; // ***
					}
				}
			}
			if(aMSnoEle.indexOf(n_A_ActiveSkill) != -1 && n_A_Weapon_zokusei <= 5){
				for(j=0; j<10; j++) {
					n_tok[170 + j] = ((n_tok[170 + j] + 100) * (100 + eTypes[n_A_Weapon_zokusei]) / 100) - 100; // ***
				}
			}
		}
	}

	//[Talon Tales Custom 2018-07-17 - Add (4 * Refine/3) Magical Fire Damage Nightmare Ancient Mummy] [Kato]
	if (n_A_card[12] == 546)
		n_tok[343] += 4 * Math.floor(n_A_SHOULDER_DEF_PLUS/3)

	/*
		Curupira Card
		[Refine Rate +7 or higher]
		Increases Water elemental magic damage by an additional 5%.
		[Refine Rate +9 or higher]
		Increases Water elemental magic damage by an additional 5%.
	*/
	if (n_A_card[8] == 570) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[341] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[341] += 5;
	}
	
	/*
		Green Lichtern Card
		[Refine Rate +7 or higher]
		Increases Earth elemental magic damage by an additional 5%.
		[Refine Rate +9 or higher]
		Increases Earth elemental magic damage by an additional 5%.
	*/
	if (n_A_card[8] == 613) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[342] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[342] += 5;
	}
	
	/*
		Red Lichtern Card
		[Refine Rate +7 or higher]
		Increases Fire elemental magic damage by an additional 5%.
		[Refine Rate +9 or higher]
		Increases Fire elemental magic damage by an additional 5%.
	*/
	if (n_A_card[8] == 611) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[343] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[343] += 5;
	}

	/*
	Tikbalang Card
	Increases the damage of Wind property magical attacks on targets by 5%.
	[Refine Rate +7 or higher]
	Add another 5% damage with Wind Magic.
	[Refine Rate +9 or higher]
	Add another 5% damage with Wind Magic.
	*/
	if (n_A_card[8] == 558) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[344] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[344] += 5;
	}

	//[Talon Tales Custom 2018-07-17 - Add 3% Magical damage boost Nightmare Verit] [Kato]
	if (n_A_card[13] == 547) {
		var iMDmgAdd = 0
		
		if(n_A_SHOES_DEF_PLUS >= 5) iMDmgAdd += 1;
		if(n_A_SHOES_DEF_PLUS >= 7) iMDmgAdd += 1;
		
		n_tok[96] += iMDmgAdd
		n_tok[97] += iMDmgAdd
	}

	/*
		Uzhas Card
		[Refine Rate +7 or higher]
		Increases magic damage against Demon race by an additional 5%.
		[Refine Rate +9 or higher]
		Increases magic damage against Demon race by an additional 5%.
	*/
	if (n_A_card[8] == 564) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[176] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[176] += 5;
	}

	if (n_A_PassSkill8[35]) // Greater Agimat of Ancient Spirit food
		n_tok[176] += 10;

	/*
		Piranha Card
		[Refine Rate +7 or higher]
		Increases magic damage against Fish race by an additional 5%.
		[Refine Rate +9 or higher]
		Increases magic damage against Fish race by an additional 5%.
	*/
	if (n_A_card[8] == 569) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[175] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[175] += 5;
	}

	/*
		Toucan Card
		[Refine Rate +7 or higher]
		Increases magic damage against Insect race by an additional 5%.
		[Refine Rate +9 or higher]
		Increases magic damage against Insect race by an additional 5%.
	*/
	if (n_A_card[8] == 571) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[174] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[174] += 5;
	}

	/*
		Jaguar Card
		[Refine Rate +7 or higher]
		Increases magic damage against Brute race by an additional 5%.
		[Refine Rate +9 or higher]
		Increases magic damage against Brute race by an additional 5%.
	*/
	if (n_A_card[8] == 572) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[172] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[172] += 5;
	}

	// Naght Sieger Card#579 [Soul Linker] Ghost property magical attack is 15% instead of 30%.	
	if (n_A_JOB == 43)
		n_tok[348] -= 15 * CardNumSearch(579);
	
	/*
		Rata Card#509
		[Refine Rate +7 or higher]
		Increases magic damage against Boss monsters by an additional 5%.
		[Refine Rate +9 or higher]
		Increases magic damage against Boss monsters by an additional 5%.
	*/
	if (n_A_card[8] == 509) {
		if(n_A_HEAD_DEF_PLUS >= 7) n_tok[97] += 5;
		if(n_A_HEAD_DEF_PLUS >= 9) n_tok[97] += 5;
	}
	
	// Wood Goblin#562 - [Every Refine Level] - Increase physical damage against Water and Earth by 1%
	if (CardNumSearch(562))
	{
		n_tok[41] += n_A_BODY_DEF_PLUS;
		n_tok[42] += n_A_BODY_DEF_PLUS;
	}
	
	// Southern Cross#1793 - [+Sphere Ammunition] - Increases damage inflicted on Neutral Property by 40%
	//										  		[Every Refine Level] - Ignore [Normal] and [Boss] class monsters defense by 3%
	if (EquipNumSearch(1793))
	{
		n_tok[40] += 40;
		n_tok[21] += n_A_Weapon_ATKplus * 3;
		n_tok[22] += n_A_Weapon_ATKplus * 3;
	}
	
	// Bobo's Boba - Ignore 10% DEF and MDEF
	if (bobo_boba_cocktail)
	{
		n_tok[21] += 10;
		n_tok[22] += 10;
		n_tok[295] += 10;
	}
	
	// Chepet's Match - Increases heal power of [Heal], [Sanctuary] and [Potion Pitcher] by 10%
	if (chepet_match_cocktail)
	{
		n_tok[91] += 10;
		n_tok[93] += 10;
		n_tok[94] += 10;
	}
	
	// Sippin' Galapago - Increases received heal from any skills by 10% for 15 minutes
	if (sippin_galapago_cocktail)
	{
		n_tok[92] += 10;
		n_tok[95] += 10;
		n_tok[199] += 10;
		n_tok[200] += 10;
	}
	
	/* 
		Eclage Foods 4-4-2020 Velaryon#8787
		Increase all damage against [C] property monsters by 5%
		Increase experience received from [C] property monsters by 5%
		Increase damage received from [X,Y,Z] property monsters by 10% (not implemented)
		
		#1 Snow Flip [Water]
		#2 Slapping Herb [Earth]
		#3 Peony Mommy [Fire]
		#4 Yggdrasil Dust [Wind]
	*/
	
	if (eclage_food) {
			n_tok[40 + eclage_food] += 5;
			n_tok[350 + eclage_food] += 5;
			n_tok[370 + eclage_food] += 5;
	}

	if (EquipNumSearch(1806)) // Vanargand Helm#1086
	{
		//[Refine Rate > 4] Add an additional 2% HP drain.
		if (n_A_HEAD_DEF_PLUS > 4)
			n_tok[381] += 2;
		//[Refine Rate > 6] Add an additional 2% HP drain, 1% SP drain and an additional 1% chance of HP and SP being drained.
		if (n_A_HEAD_DEF_PLUS > 6)
		{
			n_tok[380] += 1;
			n_tok[381] += 2;
			n_tok[382] += 1;
			n_tok[383] += 1;
		}
		//[Refine Rate > 7] Add an additional 1% chance of HP and SP being drained.
		if (n_A_HEAD_DEF_PLUS > 7)
		{
			n_tok[380] += 1;
			n_tok[382] += 1;
		}
		//[Refine Rate > 8] Add an additional 3% HP drain, 2% SP drain and an additional 1% chance of HP and SP being drained.
		if (n_A_HEAD_DEF_PLUS > 8)
		{
			n_tok[380] += 1;
			n_tok[381] += 3;
			n_tok[382] += 1;
			n_tok[383] += 2;
		}
	}

	ClickB_Enemy(0 == Taijin && document.calcForm.monster_stats_check.checked);
	
	// Chimera card#264 - [Assassin, Assassin Cross] [Poison] chance is increased by 6%.
	if (CardNumSearch(264) && n_A_JobSearch2() == 8)
		n_tok[390] += 6;
	
	// Disguise card#214 - [Base Vitality >= 77] [Silence] chance is increased by 6%.
	if (SU_VIT >= 77 && CardNumSearch(214))
		n_tok[396] += 6;
	
	// Karakasa card#261 - [Base Strength >= 77] [Confusion] chance is increased by 6%.
	if (SU_STR >= 77 && CardNumSearch(261))
		n_tok[397] += 6;
	
	// Pest card#367 - [Base Intelligence >= 77] [Stone Curse] chance is increased by 6%.
	if (SU_INT >= 77 && CardNumSearch(367))
		n_tok[399] += 6;
	
	// Rybio card#384 - [Base Dexterity >= 77] [Stun] chance is increased by 6%.
	if (SU_DEX >= 77 && CardNumSearch(384))
		n_tok[391] += 6;
	
	// Manage status ammunitions
	if (n_A_Arrow)
	{
		if (13 == n_A_Arrow) // Frozen Arrow#13
			n_tok[132] += 10;
		else if (14 == n_A_Arrow) // Poison Arrow#14
			n_tok[130] += 10;
		else if (19 == n_A_Arrow) // Curse Arrow#19
			n_tok[133] += 10;
		else if (20 == n_A_Arrow) // Flash Arrow#20
			n_tok[134] += 10;
		else if (21 == n_A_Arrow) // Mute Arrow#21
			n_tok[136] += 10;
		else if (22 == n_A_Arrow) // Sleep Arrow#22
			n_tok[135] += 10;
		else if (23 == n_A_Arrow) // Stun Arrow#23
			n_tok[131] += 10;
		else if (n_A_WeaponType >= 17 && n_A_WeaponType <= 20) // Manage bullets
		{
			if (2 == n_A_Arrow) // Bloody Shell#2
				n_tok[138] += 1;
			else if (9 == n_A_Arrow) // Gong Bug#5 - [Stun] chance is increased by 10%.
				n_tok[131] += 10;
		}
		else if (21 == n_A_WeaponType) // Manage grenade launcher ammunitions
		{
			if (3 == n_A_Arrow) // Blind Sphere#3
				n_tok[134] += 5;
			else if (4 == n_A_Arrow) // Poison Sphere#4
				n_tok[130] += 5;
		}
	}
	else if (394 == n_A_ActiveSkill && 5 == eval(document.calcForm.SkillSubNum.value)) // Throw Shuriken#394 - Starfish#5 - [Stun] chance is increased by 10%.
		n_tok[131] += 10;
	else if (395 == n_A_ActiveSkill) // Throw Kunai#395
	{
		selected_kunai = eval(document.calcForm.SkillSubNum.value);
		if (4 == selected_kunai) // Fell Poison Kunai#4
			n_tok[130] += 5;
		else if (5 == selected_kunai) // Dried Fish#5 - [Stun] chance is increased by 10%.
			n_tok[131] += 10;
	}
	
	// Scarletto Nail#1624 - [Stone] chance is increased by 0.5% for each refine level.
	n_tok[139] += EquipNumSearch(1624) * 0.5 * n_A_Weapon_ATKplus;

	// Aztoe Nail#1625 - [Freeze] chance is increased by 0.5% for each refine level.
	n_tok[132] += EquipNumSearch(1625) * 0.5 * n_A_Weapon_ATKplus;
	
	// Bloody Cross#1499 - [Bleeding] chance is increased by 0.1% for each refine level.
	n_tok[138] += EquipNumSearch(1499) * 0.1 * n_A_Weapon_ATKplus;
	
	// Glorious Morning Star#1086 - [Stun] chance is increased by 1% for each refine level.
	n_tok[131] += EquipNumSearch(1086) * 1 * n_A_Weapon_ATKplus;
	
	// Luna Kaleet#944 - [Base Strength >= 77] [Stun] chance is increased by 15%.
	if (SU_STR >= 77 && EquipNumSearch(944))
		n_tok[131] += 15;
	
	// Red Square Bag#1559 - [Base Strength >= 90] [Stun] chance is increased by 5%.
	if (SU_STR >= 90 && EquipNumSearch(1559))
		n_tok[131] += 5;
	
	// Warlock's Magic Wand#917 - [Refine Level > 6] [Stun] chance is increased by 5% when dealing magical attack.
	if (n_A_Weapon_ATKplus > 6 && EquipNumSearch(917))
		n_tok[401] += 5;

	// Manage SP cost reduction bonus
	// Mana Recharge#441 - Decreases SP Cost of all your skills by 4% by level. 
	n_tok[72] -= 4 * SkillSearch(441);

	// Green Whistle#1462 - [Every Refine Level > 6] - Reduce SP cost of all skills by 2%
	n_tok[72] -= Math.max(0, n_A_Weapon_ATKplus - 6) * 2 * EquipNumSearch(1462);

	// Staff of Destruction#646 - [Every Refine Level] - Increase SP cost of all skills by 2%
	n_tok[72] += n_A_Weapon_ATKplus * 2 * EquipNumSearch(646);

	// Staff of Ord#1171 - [Dragonology] Lv 5 - Reduce SP cost of all skills by 15%
	n_tok[72] -= 15 * Math.max(0, SkillSearch(234) - 4) * EquipNumSearch(1171);

	// Stem Whip# 1454 - [Every Refine Level > 6] - Reduce SP cost of all skills by 2%
	n_tok[72] -= Math.max(0, n_A_Weapon_ATKplus - 6) * 2 * EquipNumSearch(1454);
	
	// Rose Casquette#1741
	if (EquipNumSearch(1741))
	{
		// [Base DEX > 90] - Reduce SP cost of all skills by 5%
		if (SU_DEX > 90)
			n_tok[72] -= 5;
		// [Base DEX > 95] - Reduce SP cost of all skills by 5%
		if (SU_DEX > 95)
			n_tok[72] -= 5;
	}

	// Update Extended Information
	KakutyouKansuu();
	//KakutyouKansuu2();
}}

function StPlusCalc()
{
	n_A_JobSet();
	n_A_JobLV = eval(document.calcForm.A_JobLV.value);

	// Apply job stats bonus
	job_id = (n_A_JOB == 0 && n_Tensei) ? 34 : n_A_JOB;
	for(var i=0;JobBOBJ[n_A_JOB][i] <= n_A_JobLV && JobBOBJ[n_A_JOB][i] != "n";i+=2)
		n_tok[JobBOBJ[job_id][i+1] + 1] += 1;

	if (n_A_JobLV >= 70 && SkillSearch(309)) // SuNo No Death Bonus#309
		n_tok[7] += 10;

	n_tok[1] += SkillSearch(146);
	n_tok[1] += SkillSearch(404);
	n_tok[1] += 4 * SkillSearch(68);
	n_tok[1] += Math.floor(Math.pow(2, SkillSearch(286) - 1)); //Stealth [STR+]#286
	
	n_tok[4] += SkillSearch(404);
	n_tok[4] += Math.round(SkillSearch(234) / 2);
	
	n_tok[5] += SkillSearch(38);
	// Baby Dragon Hat#1301 - [Sage Class][Dragonology Mastered] ATK & MATK + 5% and DEX + 5"
	if (5 == SkillSearch(234) && EquipNumSearch(1301))
	{
		n_tok[5] += 5;
		n_tok[80] += 5;
		n_tok[89] += 5;
	}
	
	// Chrome Metal Sword#1623 - [Every Refine] AGI + 1, ATK + 4
	if (EquipNumSearch(1623))
	{
		n_tok[2] += n_A_Weapon_ATKplus;
		n_tok[17] += 4 * n_A_Weapon_ATKplus;
	}
	
	// Dance Shoes#1314 - [Dancer][Every 2 Refines] AGI + 2, ASPD + 1%
	if (17 == n_A_JobSearch2() && EquipNumSearch(1314))
	{
		n_tok[2] += Math.floor(n_A_SHOES_DEF_PLUS / 2);
		n_tok[12] += Math.floor(n_A_SHOES_DEF_PLUS / 2);
	}

	if(SkillSearch(422)) // Increase Accuracy#422
	{
		n_tok[5] += 4;
		n_tok[2] += 4;
	}

	// Equipment bonus
	if(n_A_JobSearch()==41 && EquipNumSearch(672))
		n_tok[2] += 1;
	if(n_A_JobSearch()==41 && EquipNumSearch(673))
		n_tok[4] += 1;
	if(n_A_JobSearch()==41 && EquipNumSearch(675))
		n_tok[6] += 2;
	if(n_A_JobSearch()==41 && EquipNumSearch(676))
		n_tok[5] += 2;
	if(n_A_JobSearch()==41 && EquipNumSearch(678))
		n_tok[6] += 1;
	if(n_A_SHOES_DEF_PLUS >= 9 && EquipNumSearch(717))
		n_tok[2] += 2;
	if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1069))
		n_tok[6] += (n_A_HEAD_DEF_PLUS - 4);
	if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1168))
		n_tok[4] += (n_A_Weapon_ATKplus - 5);
	if(EquipNumSearch(1171) && SkillSearch(234) == 5)
		n_tok[4] += 3;
	if(EquipNumSearch(1172))
		n_tok[4] += Math.floor(n_A_Weapon_ATKplus / 2);

	if(EquipNumSearch(649))
		n_tok[5] -= SU_DEX;
	
	//custom Talon Tales pet Pinguicula + Poring Cake Hat combo
	if(n_A_PassSkill8[0]==57 && EquipNumSearch(1059))
		n_tok[7] += 1;

	//[Custom Talon Tales - 6/4/2018 - Pet Pandaring + Panda Hat combo] [Kato]
	if(n_A_PassSkill8[0]==101 && EquipNumSearch(202))
		n_tok[4] += 4;

	//[Custom Talon Tales - 6/4/2018 - Pet Galapago + Galapago Hat combo] [Kato]
	if(n_A_PassSkill8[0]==93 && EquipNumSearch(502))
		n_tok[6] += 4;

	//[Custom Talon Tales - 6/4/2018 - Pet Jejeling + Baseball Cap combo] [Kato]
	if(n_A_PassSkill8[0]==119 && EquipNumSearch(787))
		n_tok[5] += 4;

	//[Custom Talon Tales - 6/4/2018 - Pet Wild Rider  + Drooping Cat combo] [Kato]
	if(n_A_PassSkill8[0]==131 && EquipNumSearch(355))
		n_tok[5] += 3;

	//custom Talon Tales Gentlemen Fez, Refine Rate 8-10 +1dex, Refine Rate 10 +1dex
	if (EquipNumSearch(1531)){
		if (n_A_HEAD_DEF_PLUS >= 8)
			n_tok[5] += 1;
		if (n_A_HEAD_DEF_PLUS == 10)
			n_tok[5] += 1;
	}
	
	// Glorious Arc Wand#1084  - [Every Refine Level] - INT + 1
	if (EquipNumSearch(1084))
		n_tok[4] += n_A_Weapon_ATKplus;

	//custom Talon Tales Improved Mage Hat: Every Refine level 7 or higher adds INT + 1 - [Loa] - 2018-06-07
	if(EquipNumSearch(1645) && n_A_HEAD_DEF_PLUS > 6){
		n_tok[4] += n_A_HEAD_DEF_PLUS - 6;
	}

	//custom Talon Tales Improved Magician Hat: Every Refine level 7 or higher adds DEX + 1 - [Loa] - 2018-06-07
	if(EquipNumSearch(1646) && n_A_HEAD_DEF_PLUS > 6){
		n_tok[5] += n_A_HEAD_DEF_PLUS - 6;
	}
		
	// Rose of Eden#1697 + Angelic Ring#1000 Set#1698 [Vanilla Mode] DEX + 2 instead of DEX + 3
	if (document.calcForm.vanilla.checked && EquipNumSearch(1698))
		n_tok[5] -= 1;

	//Custom Talon Tales - 2018-06-07 - Enhanced Helm of Angel [1] - AGI & LUK Part [Nattwara]
	/*
	[Refine Rate 5+]
	AGI + 1, LUK + 1, MDEF + 1
	[Refine Rate 6+]
	AGI + 1, LUK + 1, MDEF + 1
	*/
	if(EquipNumSearch(1655)){
		if(n_A_HEAD_DEF_PLUS>4){
			n_tok[2] += 1;
			n_tok[6] += 1;
		}
		if(n_A_HEAD_DEF_PLUS>5){
			n_tok[2] += 1;
			n_tok[6] += 1;
		}
	}

	//[Talon Tales Custom - 2018-07-27 - Glorious Bloody Roar - Every Upgrade gives + 1 INT] [Amor]
	if(EquipNumSearch(1090))
		n_tok[4] += n_A_Weapon_ATKplus;
	
	// Glorious Guitar#1092/Lariat#1093 - [Every Refine Level] - INT + 1, AGI + 1
	if (EquipNumSearch(1092) || EquipNumSearch(1093))
	{
		n_tok[2] += n_A_Weapon_ATKplus;
		n_tok[4] += n_A_Weapon_ATKplus;
	}
	
	// Glorious Staff Of Destruction#1083 - [Every Refine Level] - INT + 1, ASPD + 2%, Cast Time - 2%, increases magic damage on [Demi-Human] by 1%
	if (EquipNumSearch(1083))
	{
		n_tok[4] += n_A_Weapon_ATKplus;
		n_tok[12] += 2 * n_A_Weapon_ATKplus;
		n_tok[73] -= 2 * n_A_Weapon_ATKplus;
		n_tok[177] += n_A_Weapon_ATKplus;
	}

	//[Talon Tales Custom - 2018-07-28 - Glorious Gladius - +5 DEX for Rogue/Stalker/Ninja/SL][Amor]
	if(EquipNumSearch(1076) && (n_A_JobSearch2() == 14 || n_A_JOB== 43 || n_A_JOB == 44))
		n_tok[5] += 5;

	// Glorious Rapier#1078 - [Every Refine Level] - INT + 1 - Reduces after cast delay by 1%
	if (EquipNumSearch(1078)) {
		n_tok[4] += n_A_Weapon_ATKplus;
		n_tok[74] += n_A_Weapon_ATKplus;
		
		/*
			[Refine 7-10]
			Reduces SP consumption of skill by 10%.
			Increases effectiveness of [Potion Pitcher] 10% and [Slim Potion Pitcher] by 10%.
		*/
		if (n_A_Weapon_ATKplus >= 7)
		{
			n_tok[72] -= 10;
			n_tok[93] += 10;
			n_tok[201] += 10;
		}
		
		if (n_A_JobSearch2() == 19) // Alchemist
		{
			n_tok[4] += 4; // INT + 4
			n_tok[5] += 3; // DEX + 3
		}
	}
	// custom Talon Tales Bakonawa Card
	if (CardNumSearch(552)) {
		// If job is Monk or Champion
		if (n_A_JobSearch2() == 15)
			n_tok[26] += 10;
		else
			n_tok[26] += 15;
	}

	//zodiac hats
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1272)){n_tok[3] += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1273)){n_tok[3] += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1277)){n_tok[91] += 3;n_tok[94] += 3;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1279)){n_tok[4] += 2;}
	if(n_A_HEAD_DEF_PLUS >= 9 && EquipNumSearch(1279)){n_tok[91] += 4;n_tok[94] += 4;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1280)){n_tok[64] += 5;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1281)){n_tok[64] += 5;}
	if(n_A_HEAD_DEF_PLUS >= 8 && EquipNumSearch(1288)){n_tok[2] += 2;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1291)){n_tok[5] += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1292)){n_tok[5] += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1293)){n_tok[5] += 1;}
	if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1294)){n_tok[62] += 5;}

	//[Custom Talon Tales - 2018-07-09 Ancient Gold Adornment - Stats] [NattWara]
	if(EquipNumSearch(1663)){
		if(n_A_JobLV == 70)
			n_tok[7] += 1;
		
		var wHPVS = n_A_JobSearch();
		if(wHPVS==4){
			n_tok[5] += 1;
		}
	}

	// Giant Shield#1500 - [Every Refine Level > 5] Resistance against Large + 1%
	n_tok[192] += Math.max(0, n_A_LEFT_DEF_PLUS - 5) * EquipNumSearch(1500);

	//custom King Poring Hat
	if(EquipNumSearch(1444)){
		n_tok[5] += Math.floor(n_A_HEAD_DEF_PLUS/3);
		n_tok[6] += Math.floor(n_A_HEAD_DEF_PLUS/3);
	}

	//Orc Hero Headdress [For Every 4 Refines] STR + 1 - [Loa] - 2018-07-03
	if(EquipNumSearch(1142)){
		n_tok[1] += Math.floor(n_A_HEAD_DEF_PLUS/4);
	}
	//Phoenix Crown
	if(EquipNumSearch(872)){
		n_tok[77] += n_A_HEAD_DEF_PLUS;}
	//custom Talon Tales Bakonawa Scale Armor
	if(EquipNumSearch(1541) || EquipNumSearch(1015)){
		n_tok[77] += Math.floor(n_A_BODY_DEF_PLUS /2);
	}
	//custom Talon Tales Kalasag
	if(EquipNumSearch(1543) || EquipNumSearch(1013)){
		n_tok[77] += Math.floor(n_A_LEFT_DEF_PLUS /3);
	}
	if(EquipNumSearch(1268))n_tok[4] += Math.floor(SU_INT/24);

	/*
		Assaulter Lance
		[Crusader Class]
		VIT + 5.
	*/
	if (EquipNumSearch(904) && n_A_JobSearch2() == 13) {
		n_tok[3] += 5;
	}
	// Brave Assassin Damascus
	if (EquipNumSearch(897)) {
		// [Rogue Class]
		if (n_A_JobSearch2() == 14) {
			n_tok[5] += 2; // DEX + 2
		}
		// [Ninja Class]
		else if (n_A_JOB == 44) {
			n_tok[5] += 2; // DEX + 2
		}
	}
	/*
		Valorous Assassin Damascus
		[Ninja Class, Rogue or Stalker]
	*/
	if (EquipNumSearch(898) && (n_A_JobSearch2() == 14 || n_A_JOB == 44)) {
		n_tok[5] += 1; // DEX + 1
		
		// [Every Refine Level +6~8] - DEX + 2
		n_tok[5] += 2 * Math.min(3, Math.max(0, n_A_Weapon_ATKplus - 5)); // DEX + 2

		if (n_A_Weapon_ATKplus >= 9) {
			n_tok[5] += 3; 	// DEX + 3
			n_tok[80] += 5; // ATK + 5% 
			n_tok[89] += 5; // MATK + 5%
		}
	}
	
	/* 	Invective Robe#1818 + Heavenly Maiden Robe#522 Combo#1825
		[Every Heavenly Maiden Robe Refine Level] - MATK + 3
		[Every 2 Heavenly Maiden Robe Refine Level] - MDEF + 1
	*/
	if (EquipNumSearch(1825))
	{
		n_tok[98] += 3 * n_A_SHOULDER_DEF_PLUS;
		n_tok[19] += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}

	// Invective Robe#1818 + Vali's Manteau#704 Combo#1826 - [Every Vali's Manteau Refine Level] - VIT + 1
	n_tok[3] += n_A_SHOULDER_DEF_PLUS * EquipNumSearch(1826)
		
	/* 	Invective Robe#1818 + Ancient Cape#315 Combo#1827 - [Non-Hunter Class]
		ASPD + 5%
		[Every 2 Ancient Cape Refine Level] - AGI + 1
	*/
	if (n_A_JobSearch() != 4 && EquipNumSearch(1827))
	{
		n_tok[12] += 5;
		n_tok[2] += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}

	//[Custom Talon Tales - 2018-07-26 - Speedy Recovery Wand +3 INT to Acolyte/Priest/High Priest] [Amor]
	if (EquipNumSearch(920) && (n_A_JOB == 3 || n_A_JOB == 9 || n_A_JOB == 23))
		n_tok[4] += 3;

	// Improve Concentration#42
	// Does not include cards bonus for % bonus computation
	var ac_level = Math.max(SkillSearch(42), n_A_PassSkill6[3], TimeItemNumSearch(31) ? 2 : 0, (TimeItemNumSearch(4) || TimeItemNumSearch(57)) ? 1 : 0);
	
	// Enchants are considered as card slot as well, but applied later on, only midgear enchants need to be excluded here	
	ic_dex_bonus_exclusion = StPlusCard(5) + StPlusCard(7);
	ic_agi_bonus_exclusion = StPlusCard(2) + StPlusCard(7) + EquipNumSearch(1373);
	
	if (ac_level)
	{
		n_tok[5] += Math.floor((n_A_DEX + n_tok[5] + n_tok[7] - ic_dex_bonus_exclusion) * (2 + ac_level) / 100);
		n_tok[2] += Math.floor((n_A_AGI + n_tok[2] + n_tok[7] - ic_agi_bonus_exclusion) * (2 + ac_level) / 100);
	}

	// Card bonus
	if(n_A_JobSearch()==3)
		n_tok[4] += CardNumSearch(383);
	if(CardNumSearch(173))n_tok[4] += n_A_LEFT_DEF_PLUS;
	if(CardNumSearch(402))n_tok[6] += n_A_SHOULDER_DEF_PLUS;
	if(CardNumSearch(406))n_tok[2] += n_A_SHOES_DEF_PLUS;
	if(CardNumSearch(198))n_tok[3] += n_A_BODY_DEF_PLUS;
	if(n_A_card[8] == 180)n_tok[1] += n_A_HEAD_DEF_PLUS;
	
	if(n_A_WeaponType==9)
		n_tok[4] += CardNumSearch(466);

	if(CardNumSearch(185))n_tok[3] += Math.floor(SU_DEX /18);
	if(CardNumSearch(187))n_tok[1] += Math.floor(SU_INT /18);
	if(CardNumSearch(189))n_tok[6] += Math.floor(SU_AGI /18);
	if(CardNumSearch(191))n_tok[2] += Math.floor(SU_LUK /18);
	if(CardNumSearch(196))n_tok[4] += Math.floor(SU_STR /18);
	if(CardNumSearch(197))n_tok[5] += Math.floor(SU_VIT /18);

	//custom Talon Tales Gryphon Card
	if(CardNumSearch(277))n_tok[6] += Math.floor(SU_STR /11)*2*CardNumSearch(277);

	//custom Talon Tales Dolomedes Card
	if(CardNumSearch(514))
		if(n_A_JobSearch()==4)
			n_tok[5] += Math.floor(n_A_HEAD_DEF_PLUS /3);
		else
			n_tok[4] += Math.floor(n_A_HEAD_DEF_PLUS /3);
	//custom Talon Tales Cendrawasih Card
	if(CardNumSearch(517))
		if(n_A_JobSearch()==5)
			n_tok[4] += Math.floor(n_A_HEAD_DEF_PLUS /3);
	//custom Talon Tales King Dramoh
	if(CardNumSearch(527))
		if(n_A_JobSearch()==1)
			n_tok[1] += Math.floor(n_A_HEAD_DEF_PLUS /3);

	// Tarou#98 + Cramp#273 Combo
	if ((n_A_card[14] == 98 || n_A_card[15] == 98) && CardNumSearch(273))
		n_tok[1] += 3;

	if(CardNumSearch(405)){
		if(n_A_JobSearch()==1 || n_A_JobSearch()==2 || n_A_JobSearch()==6)
			n_tok[1] += 2;
		if(n_A_JobSearch()==3 || n_A_JobSearch()==4 || n_A_JobSearch()==5)
			n_tok[4] += 2;
	}

	// Girl Sun Hat#1830 - [Every 3 Refine Levels] INT + 2
	if (EquipNumSearch(1830))
		n_tok[4] += Math.floor(n_A_HEAD_DEF_PLUS/3) * 2;

	n_tok[1] += n_A_PassSkill2[0];
	n_tok[4] += n_A_PassSkill2[0];
	n_tok[5] += n_A_PassSkill2[0];
	//custom Talon Tales Guarana Candy Agi Increase Level 10 (n_A_IJYOU[0]=Quagmire, n_A_IJYOU[1]=Agi Decrease)
	//if(n_A_PassSkill2[1] > 0 && n_A_IJYOU[0] == 0 && n_A_IJYOU[1] == 0)
	if(n_A_PassSkill2[1] > 0 || n_A_PassSkill8[28] && n_A_IJYOU[0] == 0 && n_A_IJYOU[1] == 0)
		if(n_A_PassSkill8[28])
			n_tok[2] += 12;
		else
			n_tok[2] += n_A_PassSkill2[1] +2;

	n_tok[6] += (n_A_PassSkill2[3] * 30);

	if(n_A_JOB == 24 && SkillSearch(270))
		n_tok[7] += 5;

	if(SkillSearch(379) && n_A_WeaponType==0)
		n_tok[1] += 10;

	// Megingjard#348 - [Assassin Class] - PvP: STR bonus does not apply | PvM: Assassin Class: [Katar Weapon equipped] CRIT ATK + 15%, [Otherwise] STR + 15
	if (!Taijin && 8 == n_A_JobSearch2())
	{
		equipped_megs = EquipNumSearch(348);
		if (11 == n_A_WeaponType) // Katar weapon type
		{
			n_tok[1] -= 30 * equipped_megs;
			n_tok[70] += 15 * equipped_megs;
		}
		else
			n_tok[1] -= 15 * equipped_megs;
	}

	if(n_A_PassSkill3[40]){
		n_tok[1] += 5;
		n_tok[5] += 5;
		n_tok[4] += 5;
	}
	n_tok[1] += n_A_PassSkill3[41];
	n_tok[3] += n_A_PassSkill3[42];
	n_tok[2] += n_A_PassSkill3[43];
	n_tok[5] += n_A_PassSkill3[44];

	if(n_A_PassSkill5[0])
		n_tok[7] += 20;
	if(n_A_PassSkill6[2] == 1)
		n_tok[7] += 3;
	if(n_A_PassSkill6[2] == 2)
		n_tok[7] += 5;
	if(n_A_PassSkill8[4])
		n_tok[7] += 1;
	if(SkillSearch(310))
		n_tok[7] -= 1;

	if(n_A_PassSkill7[3])
		n_tok[1] += n_A_PassSkill7[3];
	if(n_A_PassSkill7[4])
		n_tok[2] += n_A_PassSkill7[4];
	if(n_A_PassSkill7[5])
		n_tok[3] += n_A_PassSkill7[5];
	if(n_A_PassSkill7[6])
		n_tok[4] += n_A_PassSkill7[6];
	if(n_A_PassSkill7[7])
		n_tok[5] += n_A_PassSkill7[7];
	if(n_A_PassSkill7[8])
		n_tok[6] += n_A_PassSkill7[8];

	stats_enchant_bonus = ManageStatEnchants();
	
	for (i = 0; i < stats_enchant_bonus.length; ++i)
		n_tok[i + 1] +=  stats_enchant_bonus[i];
	
	if(n_A_PassSkill8[17]) // Advance 1st Spirit (max stats)
	{
		 if(n_Tensei && 1<= n_A_JOB && n_A_JOB <= 6 && n_A_BaseLV < 70){
			if(n_A_STR + n_tok[1] <= 50)
					n_tok[1] = 50 - n_A_STR;
			if(n_A_AGI + n_tok[2] <= 50)
					n_tok[2] = 50 - n_A_AGI;
			if(n_A_VIT + n_tok[3] <= 50)
					n_tok[3] = 50 - n_A_VIT;
			if(n_A_INT + n_tok[4] <= 50)
					n_tok[4] = 50 - n_A_INT;
			if(n_A_DEX + n_tok[5] <= 50)
					n_tok[5] = 50 - n_A_DEX;
			if(n_A_LUK + n_tok[6] <= 50)
					n_tok[6] = 50 - n_A_LUK;
		}
	}

	if (n_A_PassSkill3[11]) // Marionette Control
	{
		if (n_A_PassSkill3[18] && typeof(marionette_stats) != 'undefined')
		{
			for (i = 1; i <= marionette_stats.length; ++i)
				n_tok[i] += marionette_stats[i - 1];
		}
		else  // Compensate stats based on current equipment
		{
			marionette_stats = [];
			base_stats = [n_A_STR, n_A_AGI, n_A_VIT, n_A_INT, n_A_DEX, n_A_LUK];
			
			for (i = 1; i <= base_stats.length; ++i)
			{
				marionette_bonus = Math.min(Math.max(0, 99 - (base_stats[i - 1] + n_tok[i])), Math.floor(n_A_PassSkill3[11 + i]/2));
				n_tok[i] += marionette_bonus;
				marionette_stats.push(marionette_bonus);
			}
		}
	}

	//CUSTOM (1st Transcendent Spirit)
	if(SkillSearch(392) && (n_Tensei == 1) && (n_A_BaseLV > 10) && (n_A_BaseLV < 70)){
	//alert("n_tok[1]:"+n_tok[1]+"\nn_A_STR:"+n_A_STR+"\nSU_STR:"+SU_STR);
		var linkboni = n_A_BaseLV - 10;
		//custom Talon Tales fix
		//new:
		if (n_A_STR+n_tok[1] < 51 && n_A_STR+n_tok[1] < linkboni && linkboni < 51)
			n_tok[1] +=linkboni-(n_A_STR+n_tok[1]);
		else if (n_A_STR+n_tok[1] < 51 && linkboni > 50)
			n_tok[1] += 50 - (n_A_STR+n_tok[1]);
		if (n_A_AGI+n_tok[2] < 51 && n_A_AGI+n_tok[2] < linkboni && linkboni < 51)
			n_tok[2] +=linkboni-(n_A_AGI+n_tok[2]);
		else if (n_A_AGI+n_tok[2] < 51 && linkboni > 50)
			n_tok[2] += 50 - (n_A_AGI+n_tok[2]);
		if (n_A_VIT+n_tok[3] < 51 && n_A_VIT+n_tok[3] < linkboni && linkboni < 51)
			n_tok[3] +=linkboni-(n_A_VIT+n_tok[3]);
		else if (n_A_VIT+n_tok[3] < 51 && linkboni > 50)
			n_tok[3] += 50 - (n_A_VIT+n_tok[3]);
		if (n_A_INT+n_tok[4] < 51 && n_A_INT+n_tok[4] < linkboni && linkboni < 51)
			n_tok[4] +=linkboni-(n_A_INT+n_tok[4]);
		else if (n_A_INT+n_tok[4] < 51 && linkboni > 50)
			n_tok[4] += 50 - (n_A_INT+n_tok[4]);
		if (n_A_DEX+n_tok[5] < 51 && n_A_DEX+n_tok[5] < linkboni && linkboni < 51)
			n_tok[5] +=linkboni-(n_A_DEX+n_tok[5]);
		else if (n_A_DEX+n_tok[5] < 51 && linkboni > 50)
			n_tok[5] += 50 - (n_A_DEX+n_tok[5]);
		if (n_A_LUK+n_tok[6] < 51 && n_A_LUK+n_tok[6] < linkboni && linkboni < 51)
			n_tok[6] +=linkboni-(n_A_LUK+n_tok[6]);
		else if (n_A_LUK+n_tok[6] < 51 && linkboni > 50)
			n_tok[6] += 50 - (n_A_LUK+n_tok[6]);
	}
	//END CUSTOM

	if(n_A_IJYOU[0]){
		var w1 = Math.floor((n_A_AGI + n_tok[2]) / 2);
		var w2;
		if(Taijin)
			w2 = 5 * n_A_IJYOU[0];
		else
			w2 = 10 * n_A_IJYOU[0];
		if(w1 > w2)
			n_tok[2] -= w2;
		else
			n_tok[2] -= w1;
		w1 = Math.floor((n_A_DEX + n_tok[5]) / 2);
		if(w1 > w2)
			n_tok[5] -= w2;
		else
			n_tok[5] -= w1;
	}
	if(n_A_IJYOU[1])
		n_tok[2] -= (n_A_IJYOU[1] + 2);
	if(n_A_IJYOU[3])
		n_tok[6] = -1 * n_A_LUK;

	// Siorava Card#535 - [Merchant Class] - [Every 3 Refine Levels] - LUK + 1
	if(CardNumSearch(535) && (n_A_JobSearch() == 6 || n_A_JobSearch() == 12 || n_A_JobSearch() == 26 || n_A_JobSearch() == 19 || n_A_JobSearch() == 33))
		n_tok[6] += Math.floor(n_A_HEAD_DEF_PLUS/3);
	
	// Antique Book Card#609
	if (CardNumSearch(609))
	{
		n_tok[12] += Math.floor(SU_AGI / 10); // [Every 10 Base AGI] - ASPD + 1%
		n_tok[2]  += Math.floor(n_A_SHOULDER_DEF_PLUS / 2); // [Every 2 Refine Levels] - AGI + 1
	}
	
	// Paladin Card#615
	if (CardNumSearch(615))
	{
		// [Crusader Class] - Add FLEE and CRIT + 20 while under the effect of [Spear Quicken].
		if (n_A_JobSearch2() == 13)
		{
			if (5 == n_A_WeaponType && SkillSearch(166))
			{
				n_tok[9]  += 20;
				n_tok[10] += 20;
			}
		}
		else // [Other Classes]
			n_tok[2] += Math.floor(n_A_SHOULDER_DEF_PLUS / 2); // [Every 2 Refine Levels] - AGI + 1
	}

	wSPC_STR = n_tok[1] + n_tok[7];
	wSPC_AGI = n_tok[2] + n_tok[7];
	wSPC_VIT = n_tok[3] + n_tok[7];
	wSPC_INT = n_tok[4] + n_tok[7];
	wSPC_DEX = n_tok[5] + n_tok[7];
	wSPC_LUK = n_tok[6] + n_tok[7];

	// Add bonus stats to global stats
	n_A_STR += wSPC_STR;
	n_A_AGI += wSPC_AGI;
	n_A_VIT += wSPC_VIT;
	n_A_INT += wSPC_INT;
	n_A_DEX += wSPC_DEX;
	n_A_LUK += wSPC_LUK;

	// Update bonus stats display
	myInnerHtml("A_STRp",(wSPC_STR >= 0 ? "+" : "") + wSPC_STR,0);
	myInnerHtml("A_AGIp",(wSPC_AGI >= 0 ? "+" : "") + wSPC_AGI,0);
	myInnerHtml("A_VITp",(wSPC_VIT >= 0 ? "+" : "") + wSPC_VIT,0);
	myInnerHtml("A_INTp",(wSPC_INT >= 0 ? "+" : "") + wSPC_INT,0);
	myInnerHtml("A_DEXp",(wSPC_DEX >= 0 ? "+" : "") + wSPC_DEX,0);
	myInnerHtml("A_LUKp",(wSPC_LUK >= 0 ? "+" : "") + wSPC_LUK,0);
}

function ManageStatEnchants()
{
	stats_enchant_bonus = [0,0,0,0,0,0]

	//Armor Hidden Slot Enchant STAT
	var wHSE = document.calcForm.A_HSE.value;
	if(11 <= wHSE && wHSE <= 69) {
		var tok = parseInt(wHSE.substr(0,1)) - 1;
		var val = parseInt(wHSE.substr(-1));

		stats_enchant_bonus[tok] += val;
	}

	//Custom Talon Tales Kris Enchantment for stats
	var KEbonus = [document.calcForm.A_KE11.value,document.calcForm.A_KE12.value,document.calcForm.A_KE21.value,document.calcForm.A_KE22.value];
	for(i=0; i < KEbonus.length; i++) {
		var wKE = KEbonus[i];

		if(wKE == 0 || wKE.length > 2) continue;

		var tok = parseInt(wKE.substr(0,1)) - 1;
		var val = parseInt(wKE.substr(-1));

		stats_enchant_bonus[tok] += val;
	}

	//[Custom Talon Tales 2018-06-15 - Malangdo Enchantment for STR/AGI/VIT/INT/DEX/LUK] [Kato]
	for(i=0; i < tRO_MalangdoEnchantment.length; i++) {
		var vME = tRO_MalangdoEnchantment[i];

		if(vME == 0 || vME.length > 2) continue;

		var tok = parseInt(vME.substr(0,1)) - 1;
		var val = parseInt(vME.substr(-1));

		stats_enchant_bonus[tok] += val;
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Weapon Enchantment for STR/AGI/VIT/INT/DEX/LUK] [NattWara]
	for(i=0; i < tRO_BiolabWeaponEnchantment.length; i++) {
		var vBE = tRO_BiolabWeaponEnchantment[i];

		if(vBE == 0 || vBE.length > 2) continue;

		var tok = parseInt(vBE.substr(0,1)) - 1;
		var val = parseInt(vBE.substr(-1));
		
		stats_enchant_bonus[tok] += val;
	}

	//[Custom Talon Tales 2018-07-10 - Biolab Armor Enchantment for STR/AGI/VIT/INT/DEX/LUK] [NattWara]
	for(i=0; i < tRO_BiolabArmorEnchantment.length; i++) {
		var vBE = tRO_BiolabArmorEnchantment[i];

		if(vBE == 0 || vBE.length > 2) continue;

		var tok = parseInt(vBE.substr(0,1)) - 1;
		var val = parseInt(vBE.substr(-1));

		stats_enchant_bonus[tok] += val;
	}

	//[Custom Talon Tales 2018-07-12 - Eden Armor Enchantment for STR/AGI/VIT/INT/DEX/LUK] [NattWara]
	for(i=0; i < tRO_EdenArmorEnchantment.length; i++) {
		var vEE = tRO_EdenArmorEnchantment[i];

		if(vEE == 0 || vEE.length > 2) continue;

		var tok = parseInt(vEE.substr(0,1)) - 1;
		var val = parseInt(vEE.substr(-1));
		
		stats_enchant_bonus[tok] += val;
	}

	//[Custom Talon Tales 2018-07-12 - El Dicaste Enchantment for STR/AGI/VIT/INT/DEX/LUK] [NattWara]
	for(i=0; i < tRO_EDEnchantment.length; i++) {
		var vED = tRO_EDEnchantment[i];

		if(vED == 0 || vED.length > 2) continue;

		var tok = parseInt(vED.substr(0,1)) - 1;
		var val = parseInt(vED.substr(-1));

		stats_enchant_bonus[tok] += val;
	}

	//[Custom Talon Tales 2018-07-12 - Mora Enchantment for STR/AGI/VIT/INT/DEX/LUK] [NattWara]
	for(i=0; i < tRO_MoraEnchantment.length; i++) {
		var vMORA = tRO_MoraEnchantment[i];

		if(vMORA == 0 || vMORA.length > 2) continue;

		var tok = parseInt(vMORA.substr(0,1)) - 1;
		var val = parseInt(vMORA.substr(-1));

		stats_enchant_bonus[tok] += val;
	}

	return stats_enchant_bonus;
}

function StPlusCalc2(nSTP2)
{
	var w=0;
	for(var i=0;i<=20;i++)
	{
		for(var j=0;ItemOBJ[n_A_Equip[i]][j +11] != 0;j += 2)
		{
			if(nSTP2 == ItemOBJ[n_A_Equip[i]][j +11])
				w += ItemOBJ[n_A_Equip[i]][j +12];
		}
	}
	return w;
}

function StPlusCard(nSTP2)
{
	var w=0;
	for(var i=0;i<=25;i++)
	{
		for(var j=0;cardOBJ[n_A_card[i]][j +4] != 0;j += 2)
		{
			if(nSTP2 == cardOBJ[n_A_card[i]][j +4])
				w += cardOBJ[n_A_card[i]][j +5];
		}
	}


	for(var j=0;PET_OBJ[n_A_PassSkill8[0]][j +3] != 0;j += 2)
	{
		if(nSTP2 == PET_OBJ[n_A_PassSkill8[0]][j +3])
			w += PET_OBJ[n_A_PassSkill8[0]][j +4];
	}

	var w_num = [0,0,0,0];
	for(i=0;i<=3;i++)
		w_num[i] = n_A_PassSkill8[8+i];

	for(i=0;i<=3;i++)
	{
		for(var j=0;ITEM_SP_TIME_OBJ[w_num[i]][5 + j] != 0;j += 2)
		{
			if(nSTP2 == ITEM_SP_TIME_OBJ[w_num[i]][5 + j])
				w += ITEM_SP_TIME_OBJ[w_num[i]][6 + j];
		}
	}

	//custom Talon Tales SQI-Bonus calculation
	sqi_id = is_sqi_equipped();
	
	if (sqi_id)
	{
		let current_applied_bonus_set = new Set(SQI_Bonus_Effect);
		
		for (sqi_bonus of current_applied_bonus_set)
		{
			// Ensure SQI bonus ID is not out of bond, due to previous way bonus were handled
			sqi_bonus = Math.min(sqi_bonus, sqi_bonus_db[sqi_id].length);
			if (sqi_bonus--)
				for (var j=0; sqi_bonus_db[sqi_id][sqi_bonus][1 + j] != 0; j += 2)
				{
					if(nSTP2 == sqi_bonus_db[sqi_id][sqi_bonus][1 + j])
						w += sqi_bonus_db[sqi_id][sqi_bonus][2 + j];
				}
		}
	}
	//end custom Talon Tales SQI-Bonus calculation

	//custom Talon Tales Skill9 calcs
	for(i=0;i<8;i+=2)
		if(nSTP2==n_A_PassSkill9[i]+30)
			w += n_A_PassSkill9[i+1];
	for(i=8;i<16;i+=2)
		if(nSTP2==n_A_PassSkill9[i]+40)
			w += n_A_PassSkill9[i+1];
	for(i=16;i<22;i+=2)
		if(nSTP2==n_A_PassSkill9[i]+27)
			w += n_A_PassSkill9[i+1];
	for(i=22;i<30;i+=2)
		if(nSTP2==n_A_PassSkill9[i]+81 && n_A_PassSkill9[i]<=3)
			w += n_A_PassSkill9[i+1];
		else if((nSTP2==1063 || nSTP2==1064 || nSTP2==1065 || nSTP2==1575 || nSTP2==1576) && n_A_PassSkill9[i]==4)
			w += n_A_PassSkill9[i+1];
		else if((nSTP2==1495 || nSTP2==1496) && n_A_PassSkill9[i]==5)
			w += n_A_PassSkill9[i+1];
	for(i=47;i<53;i++)
		if(nSTP2 == i-46)
			w += n_A_PassSkill9[i];
	if(nSTP2 == 13)
		w += n_A_PassSkill9[30];
	if(nSTP2 == 15)
		w += n_A_PassSkill9[31];
	if(nSTP2 == 14)
		w += n_A_PassSkill9[32];
	if(nSTP2 == 16)
		w += n_A_PassSkill9[33];
	if(nSTP2 == 18)
		w += n_A_PassSkill9[34];
	if(nSTP2 == 19)
		w += n_A_PassSkill9[35];
	if(nSTP2 == 8)
		w += n_A_PassSkill9[36];
	if(nSTP2 == 9)
		w += n_A_PassSkill9[37];
	if(nSTP2 == 11)
		w += n_A_PassSkill9[38];
	if(nSTP2 == 10)
		w += n_A_PassSkill9[39];
	if(nSTP2 == 17)
		w += n_A_PassSkill9[40];
	if(nSTP2 == 80)
		w += n_A_PassSkill9[41];
	if(nSTP2 == 89)
		w += n_A_PassSkill9[43];
	if(nSTP2 == 12)
		w += n_A_PassSkill9[44];
	if(nSTP2 == 75)
		w += n_A_PassSkill9[45];
	if(nSTP2 == 76)
		w += n_A_PassSkill9[46];
	if(nSTP2 == 99)
		w += n_A_PassSkill9[53];
	if(nSTP2 == 73)
		w += n_A_PassSkill9[54];
	if(nSTP2 == 74)
		w += n_A_PassSkill9[55];
	//end custom Talon Tales Skill9 calcs
	return w;
}

function sort(work)
{
	for(var i=1;work[i]!="EOF";i++){
		for(var k=i;k>0;k--){
			if(ItemOBJ[work[k-1]][8] > ItemOBJ[work[k]][8]){
				var work_backup = work[k-1];
				work[k-1] = work[k];
				work[k] = work_backup;
			}
		}
	}
	return work;
}

function WeaponSet()
{
	n_A_JobSet();
	n_A_WeaponType = eval(document.calcForm.A_WeaponType.value);
	var len = document.calcForm.A_weapon1.length;
	for(var i=0;i<len;i++)
		document.calcForm.A_weapon1.options[0] = null;

	work = new Array();
	j = 0;
	for (i=0;i<=ItemMax; i++){
		if(ItemOBJ[i][1] == n_A_WeaponType && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || debugMode == 1)){
			work[j] = i;
			j++;
		}
		//custom Talon Tales fix showing lv 4 weapon on active Super Novice Link
		//old stuff showed much more than lv 4 weaps only, like Stunner (lv 3)
		else if(ItemOBJ[i][1] == n_A_WeaponType && JobEquipItemSearch(ItemOBJ[i][2]) == 0 && SuperNoviceFullWeaponCHECK && ItemOBJ[i][4] == 4){
			work[j] = i;
			j++;
		}
		//original:
		/*
		}else if(ItemOBJ[i][4] >= 1 && ItemOBJ[i][1] == n_A_WeaponType && SuperNoviceFullWeaponCHECK){
			if(ItemOBJ[i][1] == 1 && ItemOBJ[i][4] == 4){
				work[j] = i;
				j++;
			}
			if(ItemOBJ[i][1] == 2 || ItemOBJ[i][1] > 3){
				work[j] = i;
				j++;
			}
		}*/
	}
	work[j] = "EOF";

	work = sort(work);
	for (i=0;i<j; i++)
		document.calcForm.A_weapon1.options[i] = new Option(ItemOBJ[work[i]][8],ItemOBJ[work[i]][0]);
	removedWep1 = [];
}

function WeaponSetLeft()
{
	n_A_JobSet();
	n_A_Weapon2Type = eval(document.calcForm.A_Weapon2Type.value);
	var len = document.calcForm.A_weapon2.length;
	for(var i=0;i<len;i++)
		document.calcForm.A_weapon2.options[0] = null;
	work = new Array();
	j = 0;
	for (i=0;i<=ItemMax; i++){
		if(ItemOBJ[i][1] == n_A_Weapon2Type && JobEquipItemSearch(ItemOBJ[i][2]) == 1)
		{
			work[j] = i;
			j++;
		}
	}
	work[j] = "EOF";
	work = sort(work);
	for (i=0;i<j; i++)
		document.calcForm.A_weapon2.options[i] = new Option(ItemOBJ[work[i]][8],ItemOBJ[work[i]][0]);
	removedWep2 = [];
}

function WeaponSet2(){
with(document.calcForm){
	n_A_JobSet();
	var len = A_head1.length;
	for(var i=0;i<len;i++)
		A_head1.options[0] = null;
	var len = A_head2.length;
	for(i=0;i<len;i++)
		A_head2.options[0] = null;
	var len = A_head3.length;
	for(i=0;i<len;i++)
		A_head3.options[0] = null;
	var len = A_left.length;
	for(i=0;i<len;i++)
		A_left.options[0] = null;
	var len = A_body.length;
	for(i=0;i<len;i++)
		A_body.options[0] = null;
	var len = A_shoulder.length;
	for(i=0;i<len;i++)
		A_shoulder.options[0] = null;
	var len = A_shoes.length;
	for(i=0;i<len;i++)
		A_shoes.options[0] = null;
	var len = A_acces1.length;
	for(i=0;i<len;i++){
		A_acces1.options[0] = null;
		A_acces2.options[0] = null;
	}
	if(first_check == 0){
		first_check = 1;
		A_head1.options[0] = new Option(ItemOBJ[142][8],ItemOBJ[142][0]);
		A_head2.options[0] = new Option(ItemOBJ[243][8],ItemOBJ[243][0]);
		A_head3.options[0] = new Option(ItemOBJ[268][8],ItemOBJ[268][0]);
		A_left.options[0] = new Option(ItemOBJ[305][8],ItemOBJ[305][0]);
		A_body.options[0] = new Option(ItemOBJ[279][8],ItemOBJ[279][0]);
		A_shoulder.options[0] = new Option(ItemOBJ[311][8],ItemOBJ[311][0]);
		A_shoes.options[0] = new Option(ItemOBJ[317][8],ItemOBJ[317][0]);
		A_acces1.options[0] = new Option(ItemOBJ[326][8],ItemOBJ[326][0]);
		A_acces2.options[0] = new Option(ItemOBJ[326][8],ItemOBJ[326][0]);
		return;
	}
	first_check = 2;

	var workB = new Array();
	for(i=0;i<=7;i++)
		workB[i] = new Array();
	var wsj = new Array();
	for(i=0;i<=7;i++)
		wsj[i]=0;
	for(i=0;i<=ItemMax; i++){
		if(ItemOBJ[i][1] == 50 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || SuperNoviceFullWeaponCHECK || debugMode == 1)){
			workB[0][wsj[0]] = i;
			wsj[0]++;
		}
		else if(ItemOBJ[i][1] == 51 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || SuperNoviceFullWeaponCHECK || debugMode == 1)){
			workB[1][wsj[1]] = i;
			wsj[1]++;
		}
		else if(ItemOBJ[i][1] == 52 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || SuperNoviceFullWeaponCHECK || debugMode == 1)){
			workB[2][wsj[2]] = i;
			wsj[2]++;
		}
		else if(ItemOBJ[i][1] == 61 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || debugMode == 1)){
			workB[3][wsj[3]] = i;
			wsj[3]++;
		}
		else if(ItemOBJ[i][1] == 60 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || debugMode == 1)){
			workB[4][wsj[4]] = i;
			wsj[4]++;
		}
		else if(ItemOBJ[i][1] == 62 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || debugMode == 1)){
			workB[5][wsj[5]] = i;
			wsj[5]++;
		}
		else if(ItemOBJ[i][1] == 63 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || debugMode == 1)){
			workB[6][wsj[6]] = i;
			wsj[6]++;
		}
		else if(ItemOBJ[i][1] == 64 && (JobEquipItemSearch(ItemOBJ[i][2]) == 1 || debugMode == 1)){
			workB[7][wsj[7]] = i;
			wsj[7]++;
		}
	}
	for(i=0;i<=7;i++)
		workB[i][wsj[i]] = "EOF";

	for(var m=0;m<=7;m++)
		workB[m] = sort(workB[m]);

	var z = 0;
	//custom Talon Tales so LKH appears as the first option on the Headgear list
	//old:
	for(i=0;i<wsj[0];i++){
		z = workB[0][i];
		A_head1.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	//new:
	/*A_head1.options[0] = new Option(ItemOBJ[workB[0][0]][8],ItemOBJ[workB[0][0]][0]);
	A_head1.options[1] = new Option(ItemOBJ[444][8],ItemOBJ[444][0]);
	for(i=2;i<wsj[0];i++){
		z = workB[0][i-1];
		A_head1.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	//last headgear, because the last one is ignored due to the changes above
	A_head1.options[wsj[0]] = new Option(ItemOBJ[workB[0][wsj[0]-1]][8],ItemOBJ[workB[0][wsj[0]-1]][0]);*/
	//end custom Talon Tales LKH appearance
	for(i=0;i<wsj[1];i++){
		z = workB[1][i];
		A_head2.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	for(i=0;i<wsj[2];i++){
		z = workB[2][i];
		A_head3.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	for(i=0;i<wsj[3];i++){
		z = workB[3][i];
		A_left.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	for(i=0;i<wsj[4];i++){
		z = workB[4][i];
		A_body.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	for(i=0;i<wsj[5];i++){
		z = workB[5][i];
		A_shoulder.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	for(i=0;i<wsj[6];i++){
		z = workB[6][i];
		A_shoes.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	for(i=0;i<wsj[7];i++){
		z = workB[7][i];
		A_acces1.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
		A_acces2.options[i] = new Option(ItemOBJ[z][8],ItemOBJ[z][0]);
	}
	removedArmor = [];
}}

function FirstNovis(){
	if(first_check == 1){
		first_check = 2;
		WeaponSet2();
		VanillaArmor();
	}
}

function JobEquipItemSearch(nJEIS)
{
	if(nJEIS >= 1000){
		if(n_Tensei == 1)
			nJEIS -= 1000;
		else
			return 0;
	}
	for(var j=0;JobEquipItemOBJ[n_A_JOB][j] != 999;j++)
	{
		if(JobEquipItemOBJ[n_A_JOB][j] == nJEIS)
			return 1;
	}
	return 0;
}

function n_A_JobSet()
{
	n_A_JOB = eval(document.calcForm.A_JOB.value);
	if(21 <= n_A_JOB && n_A_JOB <= 40){
		n_Tensei = 1;
		if(34 <= n_A_JOB && n_A_JOB <= 40)
			n_A_JOB -= 34;
	}else
		n_Tensei = 0;
}

function n_A_JobSearch(){
	if(n_A_JOB <= 6)
		return n_A_JOB;
	if(n_A_JOB == 20)
		return 0; //super novice
	if(n_A_JOB == 7 || n_A_JOB == 13 || n_A_JOB == 21 || n_A_JOB == 27)
		return 1; //swordman classes
	if(n_A_JOB == 8 || n_A_JOB == 14 || n_A_JOB == 22 || n_A_JOB == 28)
		return 2; //thief classes
	if(n_A_JOB == 9 || n_A_JOB == 15 || n_A_JOB == 23 || n_A_JOB == 29)
		return 3; //acolyte classes
	if(n_A_JOB == 10 || n_A_JOB == 16 || n_A_JOB == 17 || n_A_JOB == 24 || n_A_JOB == 30 || n_A_JOB == 31)
		return 4; //archer classes
	if(n_A_JOB == 11 || n_A_JOB == 18 || n_A_JOB == 25 || n_A_JOB == 32)
		return 5; //mage classes
	if(n_A_JOB == 12 || n_A_JOB == 19 || n_A_JOB == 26 || n_A_JOB == 33)
		return 6; //merchant classes
	if(n_A_JOB == 41 || n_A_JOB == 42 || n_A_JOB == 43)
		return 41; //taekwon classes
	return 7;
}

function n_A_JobSearch2()
{
	if(n_A_JOB == 7 || n_A_JOB == 21)
		return 7;
	if(n_A_JOB == 8 || n_A_JOB == 22)
		return 8;
	if(n_A_JOB == 9 || n_A_JOB == 23)
		return 9;
	if(n_A_JOB == 10 || n_A_JOB == 24)
		return 10;
	if(n_A_JOB == 11 || n_A_JOB == 25)
		return 11;
	if(n_A_JOB == 12 || n_A_JOB == 26)
		return 12;
	if(n_A_JOB == 13 || n_A_JOB == 27)
		return 13;
	if(n_A_JOB == 14 || n_A_JOB == 28)
		return 14;
	if(n_A_JOB == 15 || n_A_JOB == 29)
		return 15;
	if(n_A_JOB == 16 || n_A_JOB == 30)
		return 16;
	if(n_A_JOB == 17 || n_A_JOB == 31)
		return 17;
	if(n_A_JOB == 18 || n_A_JOB == 32)
		return 18;
	if(n_A_JOB == 19 || n_A_JOB == 33)
		return 19;
	return 0;
}

function EquipNumSearch(nENS)
{
	var wENS=0;
	for(var ENSi=0;ENSi<=20;ENSi++)
	{
		if(nENS == n_A_Equip[ENSi])
			wENS += 1;
	}
	return wENS;
}

function CardNumSearch(nCNS)
{
	var wCNS=0;
	for(var CNSi=0;CNSi<=25;CNSi++)
	{
		if(nCNS == n_A_card[CNSi])
			wCNS += 1;
	}
	return wCNS;
}

function TimeItemNumSearch(n)
{
	var w=0;
	for(var i=0;i<=3;i++)
	{
		if(n == n_A_PassSkill8[8+i])
			w += 1;
	}
	return w;
}

function NumSearch(NS1,NS2){
	var end = NS2.length-1;
	for(var i=0;i<=end;i++){
		if(NS1 == NS2[i])
			return 1;
	}
	return 0;
}

w_ASSP9bk=new Array();
for(i=0;i<20;i++)
	w_ASSP9bk[i]=0;
function ActiveSkillSetPlus()
{
	w_ASSP0=new Array();
	w_ASSP9=new Array();
	for(i=0;i<20;i++){
		w_ASSP0[i]=999;
		w_ASSP9[i]=0;
	}

	j=0;
	for(i=0;i<=20;i++){
		for(j2=0;ItemOBJ[n_A_Equip[i]][11+j2] != 0;j2 += 2){
			if(ItemOBJ[n_A_Equip[i]][11+j2] == 220){
				if(InsertSkill[ItemOBJ[n_A_Equip[i]][12+j2]][1] == 1){
					w_ASSP0[j] = InsertSkill[ItemOBJ[n_A_Equip[i]][12+j2]][2];
					w_ASSP9[j] = InsertSkill[ItemOBJ[n_A_Equip[i]][12+j2]][0] + 3000;
					j++;
				}
			}else if(ItemOBJ[n_A_Equip[i]][11+j2] == 221){
				if(AutoSpellSkill[ItemOBJ[n_A_Equip[i]][12+j2]][1]){
					w_ASSP0[j] = AutoSpellSkill[ItemOBJ[n_A_Equip[i]][12+j2]][2];
					w_ASSP9[j] = AutoSpellSkill[ItemOBJ[n_A_Equip[i]][12+j2]][0] + 2000;
					j++;
				}
			}
		}
	}
	
	// Apis Axe#1816 - [Novice Class or Merchant Class] - Enables use of level 1 [Throw Tomahawk#302].
	if (EquipNumSearch(1816) && (n_A_JobSearch() == 6 || n_A_JobSearch() == 0))
	{
		w_ASSP0[j] = 302;
		w_ASSP9[j] = 3008; // Acquired Skill
		j++;
	}

	for(i=0;i<=25;i++){
		for(j2=0;cardOBJ[n_A_card[i]][4+j2] != 0;j2 += 2){
			if(cardOBJ[n_A_card[i]][4+j2] == 220){
				if(InsertSkill[cardOBJ[n_A_card[i]][5+j2]][1] == 1){
					w_ASSP0[j] = InsertSkill[cardOBJ[n_A_card[i]][5+j2]][2];
					w_ASSP9[j] = cardOBJ[n_A_card[i]][5+j2] + 3000;
					j++;
				}
			}else if(cardOBJ[n_A_card[i]][4+j2] == 221){
				if(AutoSpellSkill[cardOBJ[n_A_card[i]][5+j2]][1] == 1){
					w_ASSP0[j] = AutoSpellSkill[cardOBJ[n_A_card[i]][5+j2]][2];
					w_ASSP9[j] = cardOBJ[n_A_card[i]][5+j2] + 2000;
					j++;
				}
			}
		}
	}
	//custom Talon Tales SQI-Bonus - Djinn: insert Firebolt lv6, autocast Firebolt lv6
	sqi_id = is_sqi_equipped();
	
	if (sqi_id)
	{
		let current_applied_bonus_set = new Set(SQI_Bonus_Effect);
		
		for (sqi_bonus of current_applied_bonus_set)
		{
			// Ensure SQI bonus ID is not out of bond, due to previous way bonus were handled
			sqi_bonus = Math.min(sqi_bonus, sqi_bonus_db[sqi_id].length);
			if (sqi_bonus--)
			{
				for(j2=0; sqi_bonus_db[sqi_id][sqi_bonus][1+j2] != 0;j2 += 2){
					if(sqi_bonus_db[sqi_id][sqi_bonus][1+j2] == 220){
						if(InsertSkill[sqi_bonus_db[sqi_id][sqi_bonus][2+j2]][1] == 1){
							w_ASSP0[j] = InsertSkill[sqi_bonus_db[sqi_id][sqi_bonus][2+j2]][2];
							w_ASSP9[j] = sqi_bonus_db[sqi_id][sqi_bonus][2+j2] + 3000;
							j++;
						}
					}else if(sqi_bonus_db[sqi_id][sqi_bonus][1+j2] == 221){
						if(AutoSpellSkill[sqi_bonus_db[sqi_id][sqi_bonus][2+j2]][1] == 1){
							w_ASSP0[j] = AutoSpellSkill[sqi_bonus_db[sqi_id][sqi_bonus][2+j2]][2];
							w_ASSP9[j] = sqi_bonus_db[sqi_id][sqi_bonus][2+j2] + 2000;
							j++;
						}
					}
				}
			}
		}
	}

	if(CardNumSearch(164) && (n_A_JOB == 9 || n_A_JOB == 23)){
		w_ASSP0[j] = 162;
		w_ASSP9[j] = 2095;
		j++;
	}
	if(CardNumSearch(277) && n_A_JobSearch()==1){
		w_ASSP0[j] = 76;
		w_ASSP9[j] = 2096;
		j++;
	}
	/*if(EquipNumSearch(1096) && n_A_JobSearch2() != 9){
		w_ASSP0[j] = 193;
		w_ASSP9[j] = 2108;
		j++;
	}*/
	if(n_A_PassSkill7[15]){
		var wSC = [33,34,35,36,13,37,38,39,7];
		for(var i=0;i<=8;i++){
			w_ASSP0[j] = InsertSkill[wSC[i]][2];
			w_ASSP9[j] = wSC[i] + 3000;
			j++;
		}
		w_ASSP0[j] = InsertSkill[40][2];

		w_ASSP9[j] = 3040;
		j++;
	}

	w_ASSPch=0;
	for(i=0;i<20;i++){
		if(w_ASSP9bk[i] != w_ASSP9[i])
			w_ASSPch = 1
	}
	if(w_ASSPch){
		for(k=0;JobSkillActiveOBJ[n_A_JOB][k]!=999;k++);
		for(i=k+20;i>=k;i--)
			document.calcForm.A_ActiveSkill.options[i] = null;
		j=0;
		for(i=k;w_ASSP0[j] != 999;i++,j++){
			if(w_ASSP9[j] >= 3000)
				document.calcForm.A_ActiveSkill.options[i] = new Option(SkillOBJ[w_ASSP0[j]][2]+"[Acquired Skill]",w_ASSP9[j]);
			else
				document.calcForm.A_ActiveSkill.options[i] = new Option(SkillOBJ[w_ASSP0[j]][2]+"[Auto-Casted Skill]",w_ASSP9[j]);
		}
	}
	for(i=0;i<20;i++)
		w_ASSP9bk[i] = w_ASSP9[i];

	if(eval(document.calcForm.A_ActiveSkill.value) == 0)
		document.calcForm.A_ActiveSkillLV.style.visibility = "hidden";
}

function KakutyouKansuu(){
	wKK = eval(document.calcForm.A_Kakutyou.value);
	if(wKK == 0){
		myInnerHtml("A_KakutyouData","",0);
		return;
	}
	Heal = new Array();
	if(wKK == 1){
		w = "";
	 	for(i=0;i<=10;i++)
			Heal[i] = HealCalc(i,1);
		if(n_A_JOB==3||n_A_JOB==9||n_A_JOB==13||n_A_JOB==14||n_A_JOB==15||n_A_JOB==20||n_A_JOB==23||n_A_JOB==27||n_A_JOB==28||n_A_JOB==29){
			w += "<table border=0><tr><td><b>Heal Level 1</td><td></b> "+ Heal[1] +"</td></tr>";
			w += "<tr><td><b>Heal Level 2</td><td></b> "+ Heal[2] +"</td></tr>";
			w += "<tr><td><b>Heal Level 3</td><td></b> "+ Heal[3] +"</td></tr>";
			w += "<tr><td><b>Heal Level 4</td><td></b> "+ Heal[4] +"</td></tr>";
			w += "<tr><td><b>Heal Level 5</td><td></b> "+ Heal[5] +"</td></tr>";
			w += "<tr><td><b>Heal Level 6</td><td></b> "+ Heal[6] +"</td></tr>";
			w += "<tr><td><b>Heal Level 7</td><td></b> "+ Heal[7] +"</td></tr>";
			w += "<tr><td><b>Heal Level 8</td><td></b> "+ Heal[8] +"</td></tr>";
			w += "<tr><td><b>Heal Level 9</td><td></b> "+ Heal[9] +"</td></tr>";
			w += "<tr><td><b>Heal Level 10 </td><td></b>"+ Heal[10] +"</td></tr></table>";
		}
		else{
			w += "<table border=0><tr><td><b>Heal Level 1 [Vitata Card/Dress Hat]</td><td></b>"+ Heal[1] +"</td></tr>";
			w += "<tr><td><b>Heal Level 2</td><td></b>"+ Heal[2] +"</td></tr>";
			w += "<tr><td><b>Heal Level 3</td><td></b>"+ Heal[3] +"</td></tr>";
			w += "<tr><td><b>Heal Level 4</td><td></b>"+ Heal[4] +"</td></tr>";
			w += "<tr><td><b>Heal Level 5 [Scroll]</td><td></b>"+ Heal[5] +"</td></tr></table>";
		}
		w += "<Font size=2><br><b>Required Int/Lv for next bonus: </b></Font>+"+ (8 -(n_A_BaseLV + n_A_INT) %8) + " [Heal Boost: " + n_tok[91] + "%]";
		myInnerHtml("A_KakutyouData",w,0);
	}
	else if(wKK == 2){
		if(n_A_JOB==1||n_A_JOB==7||n_A_JOB==13||n_A_JOB==20||n_A_JOB==21||n_A_JOB==27){
			HPRLV = eval(document.calcForm.A_KakutyouSelNum.value);
			w = Math.floor((5 + n_A_MaxHP / 500) * HPRLV);
			myInnerHtml("A_KakutyouData","<br>Regen: "+w,0);
		}
		//Beer Hat - [Loa] - 2018-07-04
		else if(EquipNumSearch(1240)){
			if (EquipNumSearch(1736)) //Beer Hat + Empty Liquor Bottle Combo
				w = Math.floor((5 + n_A_MaxHP / 500) * 10);
			else
				w = Math.floor((5 + n_A_MaxHP / 500) * 3);
			myInnerHtml("A_KakutyouData","<br>Regen: "+w,0);
		}else
			myInnerHtml("A_KakutyouData","",0);
	}
	else if(wKK == 3){
		if(n_A_JOB==5||n_A_JOB==9||n_A_JOB==11||n_A_JOB==18||n_A_JOB==20||n_A_JOB==23||n_A_JOB==25||n_A_JOB==32||n_A_JOB==39||n_A_JOB==44){
			SPRLV = eval(document.calcForm.A_KakutyouSelNum.value);
			w = Math.floor((3 + n_A_MaxSP / 500) * SPRLV);
			myInnerHtml("A_KakutyouData","<br>Regen: "+w,0);
		}
		//Beer Hat - [Loa] - 2018-07-04
		else if(EquipNumSearch(1240)){
			if (EquipNumSearch(1736)) //Beer Hat + Empty Liquor Bottle Combo
				w = Math.floor((3 + n_A_MaxSP / 500) * 10);
			else
				w = Math.floor((3 + n_A_MaxSP / 500) * 3);
			myInnerHtml("A_KakutyouData","<br>Regen: "+w,0);
		}else
			myInnerHtml("A_KakutyouData","",0);
	}
	else if(wKK == 4){
		if(n_A_JOB==15||n_A_JOB==29){
			SPRLV = eval(document.calcForm.A_KakutyouSelNum.value);
			w1 = Math.floor((4 + n_A_MaxHP / 500) * SPRLV);
			w2 = Math.floor((2 + n_A_MaxSP / 500) * SPRLV);
			myInnerHtml("A_KakutyouData","<br>HP Regen: "+w1+"<br>SP Regen: "+w2,0);
		}else
			myInnerHtml("A_KakutyouData","",0);
	}
	else if(wKK == 5){
			syozijob =[0,800,400,400,600,200,800,800,400,600,700,400,1000,800,400,600,700,700,400,1000,0,800,400,600,700,400,1000,800,400,600,700,700,400,1000,0,0,0,0,0,0,0,800,800,400,600,800];
			syoziryou = 2000 + syozijob[n_A_JOB];
			// syoziryou += eval(document.calcForm.A_KakutyouSelNum2.value) * 200;
			if(eval(document.calcForm.A_youshi.checked))
				syoziryou = 2000;
			syoziryou += eval(document.calcForm.A_STR.value) * 30;
			if(SkillSearch(78))
				syoziryou += 1000;
			if(n_A_JOB==6||n_A_JOB==12||n_A_JOB==19||n_A_JOB==20||n_A_JOB==26||n_A_JOB==33)
				syoziryou += eval(document.calcForm.A_KakutyouSelNum.value) * 200;
			EquipKG = 0;
			for(i=0;i<=10;i++)
				EquipKG += ItemOBJ[n_A_Equip[i]][6];

			w = "<table border=0>";
			//w += "<tr><td><b><font color=grey>White Slim Potion: </font></b>" + '<td><select name="A_WPS" onChange="StAllCalc()"></select>' + "</td>";
			//w += "<td><b><font color=blue>Blue Potion: </font></b>" + '<td><select name="A_BP" onChange="StAllCalc()"></select>' + "</td></tr>";
			w += "<tr><td><b><font color=red>Weight Limit: </font></b>" + syoziryou + "</td></tr><tr><td><b>Total Weight of Items: </b>" + EquipKG + "</td></tr><tr><td><b>89% Limit: </b>" + Math.round(syoziryou * 0.9-1) + "</td></tr><tr><td><b>49% Limit: </b>" + Math.round(syoziryou * 0.5-1);
			w += "</td></tr></table>";

			/*for(i=0;i<1000;i++)
						document.calcForm.A_WPS.options[i] = new Option(i,i);
						document.calcForm.A_WPS.value=0;}
			for(i=0;i<1000;i++)
						document.calcForm.A_BP.options[i] = new Option(i,i);
						document.calcForm.A_BP.value=0;}*/

			myInnerHtml("A_KakutyouData",w,0);

			//myInnerHtml("A_KakutyouData","Weight Limit: "+syoziryou+"<BR>Total Weight of Equipment: "+EquipKG,0);
	}
	else if(wKK == 6){
		var JyoutaiTaisei = new Array();
		var GensanTaisei = (n_A_BaseLV + n_A_LUK) / 10;
		JyoutaiTaisei[0] = n_A_VIT;
		JyoutaiTaisei[1] = JyoutaiTaisei[0];
		JyoutaiTaisei[2] = n_A_MDEF;
		JyoutaiTaisei[3] = n_A_LUK;
		JyoutaiTaisei[4] = (n_A_INT + n_A_VIT) * 0.5;
		JyoutaiTaisei[5] = n_A_INT;
		JyoutaiTaisei[6] = JyoutaiTaisei[0];
		JyoutaiTaisei[7] = (n_A_STR + n_A_INT) * 0.5;
		JyoutaiTaisei[8] = JyoutaiTaisei[0];
		JyoutaiTaisei[9] = JyoutaiTaisei[2];
		for(var i=0;i<=9;i++){
			if (JyoutaiTaisei[i] > 100){JyoutaiTaisei[i] = 100;}
			if (JyoutaiTaisei[i] < 0){JyoutaiTaisei[i] = 0;}
			}
		if(n_A_LUK == 0)
			JyoutaiTaisei[3] = 100;
		if(n_A_VIT >= 100)
			JyoutaiTaisei[3] = 100;
		if(n_A_BodyZokusei == 9){
			JyoutaiTaisei[2] = 100;
			JyoutaiTaisei[8] = 100;
			JyoutaiTaisei[9] = 100;
		}
		for(var i=0;i<=9;i++){
			JyoutaiTaisei[i] += Math.floor((100 - JyoutaiTaisei[i]) *  n_tok[150+i]) /100;
			JyoutaiTaisei[i] = Math.floor(JyoutaiTaisei[i] * 100) / 100;
			if (JyoutaiTaisei[i] > 100){JyoutaiTaisei[i] = 100;}
		}
		wkk9w = ["Boss","Long-range","Normal"];

		CBIstr = "<table border=0>";
		CBIstr += "<tr><td><b>" + ZokuseiOBJ[0] +"</b></td><td><b>"+n_A_zokusei[0] +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[1] +"</b></td><td><b>"+n_A_zokusei[1] +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[2] +"</b></td><td><b>"+n_A_zokusei[2] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + ZokuseiOBJ[3] +"</b></td><td><b>"+n_A_zokusei[3] +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[4] +"</b></td><td><b>"+n_A_zokusei[4] +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[5] +"</b></td><td><b>"+n_A_zokusei[5] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + ZokuseiOBJ[6] +"</b></td><td><b>"+n_A_zokusei[6] +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[7] +"</b></td><td><b>"+n_A_zokusei[7] +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[8] +"</b></td><td><b>"+n_A_zokusei[8] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td></td><td></td><td><b>" + ZokuseiOBJ[9] +"</b></td><td><b>"+n_A_zokusei[9] +" %" + "</b></td></tr>";
		CBIstr += "</table><center>----//----</center>";

		CBIstr += "<table border=0>";
		CBIstr += "<tr><td><b>" + SyuzokuOBJ[0] +"</b></td><td><b>"+ n_tok[50] +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[1] +"</b></td><td><b>"+ n_tok[51] +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[2] +"</b></td><td><b>"+ n_tok[52] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + SyuzokuOBJ[3] +"</b></td><td><b>"+ n_tok[53] +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[4] +"</b></td><td><b>"+ n_tok[54] +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[5] +"</b></td><td><b>"+ n_tok[55] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + SyuzokuOBJ[6] +"</b></td><td><b>"+ n_tok[56] +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[7] +"</b></td><td><b>"+ n_tok[57] +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[8] +"</b></td><td><b>"+ n_tok[58] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td></td><td></td><td><b>" + SyuzokuOBJ[9] +"</b></td><td><b>"+ n_tok[59] +" %" + "</b></td></tr>";
		CBIstr += "</table><center>----//----</center>";

		CBIstr += "<table border=0>";
		CBIstr += "<tr><td><b>" + wkk9w[0] +" Resistance</b></td><td><b>"+ n_tok[77] +" %" + "</b></td>";
		CBIstr += "<td><b>" + wkk9w[2] +" Resistance</b></td><td><b>"+ n_tok[79] +" %" + "</b></td>";
		CBIstr += "<td><b>" + wkk9w[1] +" Resistance</b></td><td><b>"+ n_tok[78] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + "Small Resistance</b></td><td><b>"+ n_tok[190] +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Medium Resistance</b></td><td><b>"+ n_tok[191] +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Large Resistance</b></td><td><b>"+ n_tok[192] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + "Melee Resistance</b></td><td><b>"+ n_tok[100] +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Magic Resistance</b></td><td><b>"+ n_tok[101] +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Misc Resistance</b></td><td><b>"+ n_tok[102] +" %" + "</b></td></tr>";
		CBIstr += "</table><center>----//----</center>";

		CBIstr += "<table border=0>";
		CBIstr += "<tr><td><b>" + IjyouOBJ[0] +"</b></td><td><b>"+ JyoutaiTaisei[0] +" %" + "</b></td>";
		CBIstr += "<td><b>" + IjyouOBJ[1] +"</b></td><td><b>"+ JyoutaiTaisei[1] +" %" + "</b></td>";
		CBIstr += "<td><b>" + IjyouOBJ[2] +"</b></td><td><b>"+ JyoutaiTaisei[2] +" %" + "</b></td>";
		CBIstr += "<td><b>" + IjyouOBJ[3] +"</b></td><td><b>"+ JyoutaiTaisei[3] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + IjyouOBJ[4] +"</b></td><td><b>"+ JyoutaiTaisei[4] +" %" + "</b></td>";
		CBIstr += "<td><b>" + IjyouOBJ[5] +"</b></td><td><b>"+ JyoutaiTaisei[5] +" %" + "</b></td>";
		CBIstr += "<td><b>" + IjyouOBJ[6] +"</b></td><td><b>"+ JyoutaiTaisei[6] +" %" + "</b></td>";
		CBIstr += "<td><b>" + IjyouOBJ[7] +"</b></td><td><b>"+ JyoutaiTaisei[7] +" %" + "</b></td></tr>";
		CBIstr += "<tr><td></td><td></td><td><b>" + IjyouOBJ[8] +"</b></td><td><b>"+ JyoutaiTaisei[8] +" %" + "</b>";
		CBIstr += "<td><b>" + IjyouOBJ[9] +"</b></td><td><b>"+ JyoutaiTaisei[9] +" %" + "</b></td></tr>";
		CBIstr += "</table>";

		var w = Math.floor((GensanTaisei -9.9) * 100) / 100;
		if(w < 0)
			w = 0;

		myInnerHtml("A_KakutyouData",CBIstr,0);
	}
	else if(wKK == 7){
		var CBIstr;
		F_MOD = 0;
		G_MOD = 0;
		B_MOD = 0;
		SM_MOD = 0;
		TU_MOD = 0; //[Custom Talon Tales - 2018-06-02 - New Attack Modifier for Turtles] [Kato]
		B_MOD += (2 == n_Enekyori ? n_tok[97] : n_tok[26] + n_tok[80]);

		for(var i=0;i<=7;i++){
			if(n_A_card[i] == 244){G_MOD += 40;}
		}
		if(EquipNumSearch(835)){SM_MOD += 10;}//Diabolus Manteau
		if(n_A_Equip[9] == 844){SM_MOD += 10;}//1º Diabolus Ring
		if(n_A_Equip[10] == 844){SM_MOD += 10;}//2º Diabolus Ring

		//custom Talon Tales ID_ARG - Satan Morroc damage modifier
		for(i=22;i<30;i+=2)
			if(n_A_PassSkill9[i]==5)
				SM_MOD += n_A_PassSkill9[i+1];
		SM_MOD = (2 == n_Enekyori ? 0 : SM_MOD);
		
		//custom Talon Tales ID_ARG - Guardian damage modifier
		for(i=22;i<30;i+=2)
			if(n_A_PassSkill9[i]==4)
				G_MOD += n_A_PassSkill9[i+1];
		G_MOD = (2 == n_Enekyori ? 0 : G_MOD);

		if(EquipNumSearch(1547)){TU_MOD += 20;}  //[Custom Talon Tales - 2018-06-02 - New Attack Modifier for Turtles - Item Droping Permeter] [Kato]
		TU_MOD = (2 == n_Enekyori ? 0 : TU_MOD);

		F_M1 = eval(document.calcForm.R_OBJ.value);
		F_M2 = eval(document.calcForm.S_OBJ.value);
		F_M3 = eval(document.calcForm.E_OBJ.value);
		F_M4 = eval(document.calcForm.B_OBJ.value);
		F_M5 = eval(document.calcForm.SP_OBJ.value);

		if(F_M1 == 0){F_M1 = (2 == n_Enekyori ? n_tok[170] : n_tok[30]);}
		else if(F_M1 == 1){F_M1 = (2 == n_Enekyori ? n_tok[171] : n_tok[31]);}
		else if(F_M1 == 2){F_M1 = (2 == n_Enekyori ? n_tok[172] : n_tok[32]);}
		else if(F_M1 == 3){F_M1 = (2 == n_Enekyori ? n_tok[173] : n_tok[33]);}
		else if(F_M1 == 4){F_M1 = (2 == n_Enekyori ? n_tok[174] : n_tok[34]);}
		else if(F_M1 == 5){F_M1 = (2 == n_Enekyori ? n_tok[175] : n_tok[35]);}
		else if(F_M1 == 6){F_M1 = (2 == n_Enekyori ? n_tok[176] : n_tok[36]);}
		else if(F_M1 == 7){F_M1 = (2 == n_Enekyori ? n_tok[177] : n_tok[37]);}
		else if(F_M1 == 8){F_M1 = (2 == n_Enekyori ? n_tok[178] : n_tok[38]);}
		else if(F_M1 == 9){F_M1 = (2 == n_Enekyori ? n_tok[179] : n_tok[39]);}

		if(F_M2 == 0){F_M2 = (2 == n_Enekyori ? 0 : n_tok[27]);}
		else if(F_M2 == 1){F_M2 = (2 == n_Enekyori ? 0 : n_tok[28]);}
		else if(F_M2 == 2){F_M2 = (2 == n_Enekyori ? 0 : n_tok[29]);}

		if(F_M3 == 0){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[350] : n_tok[40]);}
		else if(F_M3 == 1){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[351] : n_tok[41]);}
		else if(F_M3 == 2){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[352] : n_tok[42]);}
		else if(F_M3 == 3){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[353] : n_tok[43]);}
		else if(F_M3 == 4){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[354] : n_tok[44]);}
		else if(F_M3 == 5){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[355] : n_tok[45]);}
		else if(F_M3 == 6){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[356] : n_tok[46]);}
		else if(F_M3 == 7){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[357] : n_tok[47]);}
		else if(F_M3 == 8){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[358] : n_tok[48]);}
		else if(F_M3 == 9){F_M3 = (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[359] : n_tok[49]);}

		if(F_M4 == 0){F_M4 = (2 == n_Enekyori ? n_tok[96] : n_tok[80]);}
		else if(F_M4 == 1){F_M4 = B_MOD;}

		if(F_M5 == 0){F_M5 = 0;}
		else if(F_M5 == 1){F_M5 = (2 == n_Enekyori ? 0 : n_tok[81]);}
		else if(F_M5 == 2){F_M5 = (2 == n_Enekyori ? 0 : n_tok[84]);}
		else if(F_M5 == 3){F_M5 = G_MOD;}
		else if(F_M5 == 4){F_M5 = (2 == n_Enekyori ? 0 : n_tok[82]);}
		else if(F_M5 == 5){F_M5 = (2 == n_Enekyori ? 0 : n_tok[83]);}
		else if(F_M5 == 6){F_M5 = SM_MOD;}

		F_M1 = 1+(F_M1/100);
		F_M2 = 1+(F_M2/100);
		F_M3 = 1+(F_M3/100);
		F_M4 = 1+(F_M4/100);
		F_M5 = 1+(F_M5/100);
		F_MOD = Math.round((F_M1*F_M2*F_M3*F_M4*F_M5)*100);

		CBIstr = "<table border=0>";
		CBIstr += "<tr><td><b>" + SyuzokuOBJ[0] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[170] : n_tok[30]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[1] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[171] : n_tok[31]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[2] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[172] : n_tok[32]) +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + SyuzokuOBJ[3] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[173] : n_tok[33]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[4] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[174] : n_tok[34]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[5] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[175] : n_tok[35]) +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + SyuzokuOBJ[6] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[176] : n_tok[36]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[7] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[177] : n_tok[37]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + SyuzokuOBJ[8] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[178] : n_tok[38]) +" %" + "</b></td></tr>";
		CBIstr += "<tr><td></td><td></td><td><b>" + SyuzokuOBJ[9] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[179] : n_tok[39]) +" %" + "</b></td></tr>";
		CBIstr += "</table><center>----//----</center>";

		CBIstr += "<table border=0>";
		CBIstr += "<tr><td><b>" + ZokuseiOBJ[0] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[350] : n_tok[40]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[1] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[351] : n_tok[41]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[2] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[352] : n_tok[42]) +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + ZokuseiOBJ[3] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[353] : n_tok[43]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[4] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[354] : n_tok[44]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[5] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[355] : n_tok[45]) +" %" + "</b></td></tr>";
		CBIstr += "<tr><td><b>" + ZokuseiOBJ[6] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[356] : n_tok[46]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[7] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[357] : n_tok[47]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + ZokuseiOBJ[8] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[358] : n_tok[48]) +" %" + "</b></td></tr>";
		CBIstr += "<tr><td></td><td></td><td><b>" + ZokuseiOBJ[9] +"</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[340 + n_A_Weapon_zokusei] + n_tok[359] : n_tok[49]) +" %" + "</b></td></tr>";
		CBIstr += "</table><center>----//----</center>";

		CBIstr += "<table border=0>";
		CBIstr += "<tr><td><b>" + "Goblin</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[81]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Golem</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[84]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Kobold</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[82]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Orc</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[83]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Turtle</b></td><td><b>"+ TU_MOD +" %" + "</b></td></tr>"; //[Custom Talon Tales - 2018-06-02 - New Attack Modifier for Turtles] [Kato]
		CBIstr += "<tr><td><b>" + "Guardian</b></td><td><b>"+ G_MOD +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Satan Morroc</b></td><td><b>"+ SM_MOD +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Boss</b></td><td><b>"+ B_MOD +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Normal</b></td><td><b>"+ (2 == n_Enekyori ? n_tok[96] : n_tok[80]) +" %" + "</b></td></tr>";
		CBIstr += "</table><center>----//----</center>";

		CBIstr += "<table border=0>";
		CBIstr += "<tr><td><b>" + "Small</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[27]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Medium</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[28]) +" %" + "</b></td>";
		CBIstr += "<td><b>" + "Large</b></td><td><b>"+ (2 == n_Enekyori ? 0 : n_tok[29]) +" %" + "</b></td></tr>";
		CBIstr += "</table>";

		CBIstr += "<hr><table border=0>";
		CBIstr += "<td><b>Final Damage Modifier: </b>"+ F_MOD +" %</td>";
		CBIstr += "</table>";

		myInnerHtml("A_KakutyouSel",CBIstr,0);
	}
	else if(wKK == 8){//create your enemy
		n_B[6] = CYE[0];

		myInnerHtml("A_KakutyouData",CBIstr,0);
	}
	else if(wKK == 9){
		wkk9 = "<b>SP Cost Modifier: </b>" + n_tok[72] + " %";
		myInnerHtml("A_KakutyouData",wkk9,0);
	}else if(wKK == 10){
		var wkk10;
		wkk10 = "<b>Cast Time: </b>"+ Math.round(n_A_CAST *10000)/100 + " % [ "+(100 + n_tok[73]) + " % " + (seductive_bathory_cocktail ? "(25 %) " : "") + "and "+n_A_DEX+" DEX ]<BR>";
		wkk10 += "<b>Cast Delay: </b>"+ Math.round((100 - n_tok[74]) *100)/100 +" %";
		myInnerHtml("A_KakutyouData",wkk10,0);
	}else if(wKK == 11){
		var NowBaseExp = eval(document.calcForm.A_KakutyouSelNum.value);
		var NowJobExp = eval(document.calcForm.A_KakutyouSelNum2.value);
		if(!(0 <= NowBaseExp && NowBaseExp <= 100)){
			NowBaseExp = 0;
			document.calcForm.A_KakutyouSelNum.value = 0;
		}
		if(!(0 <= NowJobExp && NowJobExp <= 100)){
			NowJobExp = 0;
			document.calcForm.A_KakutyouSelNum2.value = 0;
		}
		var JobType=0;
		if(n_A_JOB == 0 && n_Tensei)
			JobType = 1;
		if((1 <= n_A_JOB && n_A_JOB <= 6) || n_A_JOB == 41 || n_A_JOB == 20){
			JobType = 2;
			if(n_Tensei)
				JobType = 3;
		}
		if((7 <= n_A_JOB && n_A_JOB <= 19) || n_A_JOB == 43)
			JobType = 4;
		if(21 <= n_A_JOB && n_A_JOB<=33)
			JobType = 5;
		if(n_A_JOB == 42)
			JobType = 7;
		if(n_A_JOB == 44 || n_A_JOB == 45)
			JobType = 6;

		NowBaseExp = Math.floor(PC_BaseExp[n_Tensei][n_A_BaseLV] * NowBaseExp / 100);


		var wkk11;
		wkk11 = "<Font size=2>Required BaseExp for Base Up: <B>"+ Kanma(PC_BaseExp[n_Tensei][n_A_BaseLV] - NowBaseExp) +" </B>exp<BR>";

		var MonsterNum=0;
		var OneCheck = 0;
		if(n_B[16] != 0){
			for(i=n_A_BaseLV;i<99;i++){
				var LvUpExp = PC_BaseExp[n_Tensei][i];

				var w1 = Math.floor((LvUpExp - NowBaseExp) / n_B[16]);
				MonsterNum += w1;
				NowBaseExp += w1 * n_B[16];

				while(NowBaseExp < LvUpExp){
					NowBaseExp += n_B[16];
					MonsterNum += 1
				}
				if(OneCheck==0){
					OneCheck = 1;
					wkk11 += "(Equals <B>"+ Kanma(MonsterNum) +"</B> "+ n_B[1] +" kill"+(Kanma(MonsterNum)!=1?"s":"")+")<BR>";
				}
				NowBaseExp -= LvUpExp;
				if(NowBaseExp > LvUpExp -1)
					NowBaseExp = LvUpExp -1;
			}
			wkk11 += "Until BaseLv99: <B>"+ Kanma(MonsterNum) +"</B> more "+ n_B[1] +" kill"+(Kanma(MonsterNum)!=1?"s":"")+"<BR><BR>";
		}


		NowJobExp = Math.floor(PC_JobExp[JobType][n_A_JobLV] * NowJobExp / 100);
		if(((1 <= n_A_JOB && n_A_JOB <= 6) || n_A_JOB == 41) && n_A_JobLV == 50)
			NowJobExp = 0;
		wkk11 += "Required JobExp for Job Up: <B>"+ Kanma(PC_JobExp[JobType][n_A_JobLV] - NowJobExp) +"</B> exp<BR>";

		MonsterNum=0;
		OneCheck = 0;
		if(n_B[17] != 0){
			for(i=1;PC_JobExp[JobType][i]!=0;i++);
			var MaxJobLV = i;
			if((1 <= n_A_JOB && n_A_JOB <= 6) || n_A_JOB == 41)
				MaxJobLV = 50;
			for(i=n_A_JobLV;i<MaxJobLV;i++){
				var LvUpExp = PC_JobExp[JobType][i];

				var w1 = Math.floor((LvUpExp - NowJobExp) / n_B[17]);
				MonsterNum += w1;
				NowJobExp += w1 * n_B[17];

				while(NowJobExp < LvUpExp){
					NowJobExp += n_B[17];
					MonsterNum += 1
				}
				if(OneCheck==0){
					OneCheck = 1;
					wkk11 += "(Equals <B>"+ Kanma(MonsterNum) +"</B> "+ n_B[1] +" kill"+(Kanma(MonsterNum)!=1?"s":"")+")<BR>";
				}
				NowJobExp -= LvUpExp;
				if(NowJobExp > LvUpExp -1)
					NowJobExp = LvUpExp -1;
			}
			wkk11 += "Until JobLv"+ MaxJobLV +": <B>"+ Kanma(MonsterNum) +"</B> more "+ n_B[1] +" kill"+(Kanma(MonsterNum)!=1?"s":"")+"<BR><BR>";
		}
		wkk11 += "</Font>";

		myInnerHtml("A_KakutyouData",wkk11,0);
	}
	else if(wKK == 12)
	{
		pp_lv = eval(document.calcForm.pp_lv.value);
		spp_lv = eval(document.calcForm.spp_lv.value);
		source_lv = eval(document.calcForm.pp_source_lv.value);
		hp_recovery_lv = eval(document.calcForm.pp_irp_lv.value);
		sp_recovery_lv = eval(document.calcForm.pp_isp_lv.value);
		target_vit = eval(document.calcForm.pp_target_vit.value);
		target_int = eval(document.calcForm.pp_target_int.value);
		//potion_rank = eval(document.calcForm.pp_potion_rank.value); Rank not taken into consideration for PP/SPP
		pp_consumable = eval(document.calcForm.pp_consumable.value);
		pp_healpower = eval(document.calcForm.pp_heal_rate_bonus.value);
		spp_healpower = eval(document.calcForm.spp_heal_rate_bonus.value);
		selected_consumable = eval(document.calcForm.pp_consumable.value);
		is_source_linked = eval(document.calcForm.pp_source_link.checked);
		learning_potion_lv = eval(document.calcForm.pp_learning_potion_lv.value);
		pp_healpower2 = eval(document.calcForm.pp_received_heal_rate_bonus.value);
		spp_healpower2 = eval(document.calcForm.spp_received_heal_rate_bonus.value);

		// Common bonus
	
		if (selected_consumable < 4)
			relative_bonus = (1 + target_vit * 2 / 100) * (1 + hp_recovery_lv / 10);
		else
			relative_bonus = (1 + target_int * 2 / 100) * (1 + sp_recovery_lv / 10);

		rank_bonus = 1
		/* Rank not taken into consideration for PP/SPP
		if (potion_rank)
			rank_bonus = (1 + potion_rank * 0.25); */

		// Potion Pitcher
		
		link_bonus = 100 + (is_source_linked ? source_lv : 0);
		bonus = (100 + pp_lv * 10 + learning_potion_lv * 5) * link_bonus / 10000 * relative_bonus * rank_bonus;

		// Retrieve all items bonus list
		equipped_items = n_A_Equip.map(x => ItemOBJ[x]);
		
		// Retrieve all cards bonus list
		equipped_cards = n_A_card.map(x => cardOBJ[x]);
		
		// Merge into one unique list to simplify underneath reduce
		active_bonus = equipped_items.concat(equipped_cards);
		
		// Include pet bonus as well
		active_bonus.push(PET_OBJ[n_A_PassSkill8[0]]);

		function reduce_group_item_bonus(acc, x, ids, tok)
		{
			i = -1;
			
			while ((i = x.indexOf(tok, i + 1)) != -1)
			{
				if (x[i+1].constructor === Array)
				{
					if (x[i+1][2]) 	// Group bonus
						acc += (ids.indexOf(x[i+1][0]) != -1 ? x[i+1][1] : 0);
				}
			}
			
			return acc;
		}

		// IG_Potion group effectiveness bonus
		bonus *= (1 + active_bonus.reduce((acc, x) => reduce_group_item_bonus(acc, x, [501,502,503,504], 218), 0) / 100);

		// bHealPower bonus
		bonus *= 1 + (pp_healpower / 100);
		
		// bHealPower2 bonus
		bonus *=  1 + (pp_healpower2 / 100);
		
		min_heal = Math.floor(PP_POTIONS[selected_consumable][1] * bonus);
		max_heal = Math.floor(PP_POTIONS[selected_consumable][2] * bonus);
	
		if (PP_POTIONS[selected_consumable][4] > pp_lv)
			pp_display = "<table border = 0><tr><td><b>Potion Pitcher heals for: </b>Not available for current skill level</td>";
		else
			pp_display = "<table border = 0><tr><td><b>Potion Pitcher heals for: </b>" + min_heal + " ~ " + max_heal + "</td>";
		
		// Slim Potion Pitcher
		bonus = (1 + (spp_lv * 10 + pp_lv * 10 + learning_potion_lv * 5) / 100) * relative_bonus * rank_bonus;
		
		// bHealPower bonus
		bonus *= 1 + (spp_healpower / 100);
		
		// bHealPower2 bonus
		bonus *=  1 + (spp_healpower2 / 100);
		
		min_heal = Math.floor(PP_POTIONS[selected_consumable][1] * bonus);
		max_heal = Math.floor(PP_POTIONS[selected_consumable][2] * bonus);
		
		if (!PP_POTIONS[selected_consumable][5])
			pp_display += "<td><b>Slim Potion Pitch heals for: </b>Not available for " + PP_POTIONS[selected_consumable][3];
		else if (PP_POTIONS[selected_consumable][5] > spp_lv)
			pp_display += "<td><b>Slim Potion Pitch heals for: </b>Not available for current skill level";
		else
			pp_display += "<td><b>Slim Potion Pitch heals for: </b>" + min_heal + " ~ " + max_heal;
	
		pp_display += "</td></tr></table>";

		myInnerHtml("A_KakutyouData", pp_display, 0);
	}
	else if(wKK == 13){
		if(n_A_JOB==12||n_A_JOB==26){
			smithing = eval(document.calcForm.A_SmithT.value);
			orideconres = eval(document.calcForm.A_OriR.value);
			weaponres = eval(document.calcForm.A_WepR.value);
			starcrumb = eval(document.calcForm.A_StarC.value);
			elemstone = eval(document.calcForm.A_ElemS.value);
			anvil = eval(document.calcForm.A_KakutyouSelNum.value);
			iron = eval(document.calcForm.A_Iron.value);
			steel = eval(document.calcForm.A_Steel.value);
			stone = eval(document.calcForm.A_StoneC.value);
			anvil2 = Anvil_Type[anvil][1];

			adopted = eval(document.calcForm.A_youshi.checked);

			srate1 = Math.floor((50 + smithing*5 + weaponres + anvil2 + n_A_JobLV * 0.2 + (n_A_DEX +n_A_LUK)* 0.1 - starcrumb*15 - elemstone*20)*100)/100;
			srate2 = Math.floor((50 + smithing*5 + weaponres + anvil2 + n_A_JobLV * 0.2 + (n_A_DEX +n_A_LUK)* 0.1 - starcrumb*15 - elemstone*20 - 20)*100)/100;
			srate3 = Math.floor((50 + smithing*5 + orideconres + weaponres + anvil2 + n_A_JobLV * 0.2 + (n_A_DEX +n_A_LUK)* 0.1 - starcrumb*15 - elemstone*20 - 30)*100)/100;
			srate4 = Math.floor((40 + n_A_JobLV * 0.2 + (n_A_DEX +n_A_LUK)* 0.1 + iron*5)*100)/100;
			srate5 = Math.floor((30 + n_A_JobLV * 0.2 + (n_A_DEX +n_A_LUK)* 0.1 + steel*5)*100)/100;
			srate6 = Math.floor((10 + n_A_JobLV * 0.2 + (n_A_DEX +n_A_LUK)* 0.1 + stone*5)*100)/100;

			if(srate1 < 0){srate1 = 0;}
			if(srate2 < 0){srate2 = 0;}
			if(srate3 < 0){srate3 = 0;}
			if(srate4 < 0){srate4 = 0;}
			if(srate5 < 0){srate5 = 0;}
			if(srate6 < 0){srate6 = 0;}

			if(adopted){
				srate1 = Math.floor((srate1 * 0.7)*100)/100;
				srate2 = Math.floor((srate2 * 0.7)*100)/100;
				srate3 = Math.floor((srate3 * 0.7)*100)/100;}

			weaponforge = "<table border = 0><tr><td><b>Weapon Lvl 1: </b>" + srate1 + " %</td>&nbsp;&nbsp;";
			weaponforge += "<td><b>Weapon Lvl 2: </b>" + srate2 + " %</td>&nbsp;";
			weaponforge += "<td><b>Weapon Lvl 3: </b>" + srate3 + " %</td></tr>";
			weaponforge += "<tr><td><b>Iron: </b>" + srate4 + " %</td>&nbsp;";
			weaponforge += "<td><b>Steel: </b>" + srate5 + " %</td>&nbsp;";
			weaponforge += "<td><b>Elemental Stone: </b>" + srate6 + " %</td></tr></table>";
			myInnerHtml("A_KakutyouData",weaponforge,0);
		}
		else if(n_A_JOB==19||n_A_JOB==33){
			potionr = eval(document.calcForm.A_PotionRLevel.value);
			//custom Talon Tales Update 2014-09-29
			//before
			//vani = eval(document.calcForm.A_Van.value);
			preparep = eval(document.calcForm.A_PreparePLevel.value);
			selpot = eval(document.calcForm.A_KakutyouSelNum.value);
			//custom Talon Tales Update 2014-09-29
			//after:
			homunlevel = eval(document.calcForm.A_HomunLevel.value);
			homunevolved = eval(document.calcForm.A_HomunEvolved.value);
			//end
			potrate = Potion_Type[selpot][1];
			//custom Talon Tales Update 2014-09-29
			pharmacyboost = homunlevel * 0.025;
			if (homunevolved)
				pharmacyboost *= 2;
			adopted = eval(document.calcForm.A_youshi.checked);
			//Brewing rework - [Loa] - 2018-06-17
			srate = potionr * 50 + preparep * 300 + n_A_JobLV * 20 + (n_A_DEX + n_A_LUK + (n_A_INT/2)) * 10 + potrate * 100 + pharmacyboost * 100;
			//selpot values in etc.js
			if(selpot == 3 //blue pot
				|| selpot == 4 //slim red
				|| selpot == 13 //anodyne
				|| selpot == 14 //aloevera
				|| selpot == 15 //embryo
				|| selpot == 16) //elemental
			{
				brate = 0;
			}
			else if(selpot == 5) //slim yellow
			{
				brate = -500;
			}
			else if(selpot == 0 //red pot
				|| selpot == 1 //yellow pot
				|| selpot == 2 //white pot
				|| selpot == 7 //alcohol
				|| selpot == 8 //acid
				|| selpot == 9 //grenade
				|| selpot == 10 //plant
				|| selpot == 11) //marine
			{
				brate = 1000;
			}
			else if(selpot == 6 //slim white
				|| selpot == 12) //glisten
			{
				brate = -1000;
			}
			//add brewing variance
			if(brate < 0){srate1 = srate - 10;}
			else if(brate > 0){srate1 = srate + 10;}
			else{srate1 = srate;}
			srate2 = srate + (brate/2);
			srate3 = srate + brate;
			//baby alchemist penalty
			if(adopted){
				srate1 = Math.floor(srate1 * 70) / 100;
				srate2 = Math.floor(srate2 * 70) / 100;
				srate3 = Math.floor(srate3 * 70) / 100;
			}
			//limit success range to 0-100%
			if(srate1 > 10000){srate1 = 10000;}
			if(srate1 < 0){srate1 = 0;}
			if(srate2 > 10000){srate2 = 10000;}
			if(srate2 < 0){srate2 = 0;}
			if(srate3 > 10000){srate3 = 10000;}
			if(srate3 < 0){srate3 = 0;}
			srate_avg = Math.floor((srate1 + srate2 + srate3)/3)/100;
			srate_min = Math.floor(Math.min(srate1, srate2, srate3))/100;
			srate_med = Math.floor(srate2)/100;
			srate_max = Math.floor(Math.max(srate1, srate2, srate3))/100;
			myInnerHtml("A_KakutyouData","<b><br>Success rate range (Minimum ~ Median ~ Maximum):</b> " + srate_min + " % ~ " + srate_med + " % ~ " + srate_max + " %" + "<br><b>Success rate averge:</b> " + srate_avg + " %",0);
		}
		else if(n_A_JOB==22){
			myInnerHtml("A_KakutyouSel","Potion to Create: " + '<select name="A_KakutyouSelNum" onChange="StAllCalc()"></select><BR>',0);
			document.calcForm.A_KakutyouSelNum.options[0] = new Option("Poison Bottle",0);
			document.calcForm.A_KakutyouSelNum.value=0;

			srate = Math.floor((0.2 + (0.4*n_A_DEX) + (0.2*n_A_LUK))*100)/100;

			myInnerHtml("A_KakutyouData","<b><br>Success rate: </b>" + srate + " %",0);

		}else{myInnerHtml("A_KakutyouData","Not Available for this Class",0);}
	}
	/*else if(wKK == 1 4){
		var wkk14;
		if(n_A_JOB == 19 || n_A_JOB == 33 ){
			Amistr = n_A_STR + n_A_AGI + n_A_VIT;
			Filir = n_A_STR + n_A_AGI + n_A_LUK;
			Vanilmirth = n_A_INT + n_A_DEX + n_A_LUK;
			Lif = n_A_VIT + n_A_INT + n_A_DEX;

			homontotal = Amistr + Filir + Vanilmirth + Lif;
			Amistr = Amistr / homontotal * 100;
			Filir = Filir / homontotal * 100;
			Vanilmirth = Vanilmirth / homontotal * 100;
			Lif = Lif / homontotal * 100;

			wkk14 = "<table border=0><tr><td>Chance to get Amistr: </td><td>" + Math.floor(Amistr*10)/10 + " %</td></tr>";
			wkk14 += "<tr><td>Chance to get Filir: </td><td>" + Math.floor(Filir*10)/10 + " %</td></tr>";
			wkk14 += "<tr><td>Chance to get Vanilmirth: </td><td>" + Math.floor(Vanilmirth*10)/10 + " %</td></tr>";
			wkk14 += "<tr><td>Chance to get Lif: </td><td>" + Math.floor(Lif*10)/10 + " %</td></tr></table>";

		}else{wkk14 = "Not Available for this Class";}
		myInnerHtml("A_KakutyouData",wkk14,0);
	}*/
	else if(wKK == 14){ // Strip Chance
		var wkk14;
		if(n_A_JOB == 14 || n_A_JOB == 28){

			S_LV1 = eval(document.calcForm.S_LV.value);
			E_DEX1 = eval(document.calcForm.E_DEX.value);
			Strip = Math.max(0, 5 + (5*S_LV1) + ((n_A_DEX - E_DEX1)/5));
			S_Time = 60 + (15 * S_LV1) + Math.max(0, (n_A_DEX - E_DEX1)/2);

			if(n_A_JOB == 28){
				FS_LV1 = eval(document.calcForm.FS_LV.value);
				FStrip = Math.max(5 + 2 * FS_LV1, 5 + (2*FS_LV1) + ((n_A_DEX - E_DEX1)/5));
				FS_Time = 60 + (Taijin ? 0 : 15) + (15 * FS_LV1) + Math.max(0, (n_A_DEX - E_DEX1)/2);
			}

			if(n_A_JOB == 14){
				wkk14 = "<table border=0><tr><td><b>Chance to Strip [Helm], [Armor], [Weapon] or [Shield]: </b></td><td>" + Math.floor(Strip*10)/10 + " %</td></tr>";
				wkk14 += "<tr><td><font color=red><b>Duration Time: </b></font></td><td>" + Math.floor(S_Time*10)/10 + " Seconds</td></tr></table>";
			}
			else if(n_A_JOB == 28){
				wkk14 = "<table border = 0><tr><td><b>Chance to Strip [Helm], [Armor], [Weapon] or [Shield]: </b></td><td>" + Math.floor(Strip*10)/10 + " %</td></tr>";
				wkk14 += "<tr><td><font color=red><b>Duration Time: </b></font></td><td>" + Math.floor(S_Time*10)/10 + " Seconds</td></tr>";
				wkk14 += "<tr><td><b>Chance to Full Strip (disabled on boss protocol): </b></td><td>" + Math.floor(FStrip*10)/10 + " %</td></tr>";
				wkk14 += "<tr><td><font color=red><b>Duration Time: </b></font></td><td>" + Math.floor(FS_Time*10)/10 + " Seconds</td></tr></table>";
			}
		}
		else
		{
			wkk14 = "";
			strip_types = [];
			strip_levels = [];
			
			
			if(CardNumSearch(157)) // Metaling#157
			{
				strip_levels.push(1);
				strip_types.push("[Weapon]");
			}

			if(CardNumSearch(413)) // Wikebine Tres#413
			{
				strip_levels.push(1);
				strip_types.push("[Armor]");
			}

			// Tome of Ymir#1391#4th Bonus - Enables use of level 3 [Strip Shield]
			if (1391 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 4) > -1)
			{
				strip_levels.push(3);
				strip_types.push("[Shield]");
			}	

			for (i = 0; i < strip_levels.length; ++i)
			{
				strip_lv = strip_levels[i];
				strip_type = strip_types[i];

				source_dex = n_A_DEX;
				target_dex = eval(document.calcForm.E2_DEX.value);
				dex_diff = source_dex - target_dex;
				
				strip_rate = Math.max(0, 5 * (strip_lv + 1) + 0.2 * (dex_diff));
				strip_duration = 60 + (Taijin ? 0 : 15) + strip_lv * 15 + Math.max(0, strip_lv + 0.5 * dex_diff);
				
				wkk14 += "<br><table border=0><tr><td width=50%><b>Chance to Strip " + strip_type + ": </b></td><td>" + Math.floor(strip_rate * 10)/10 + " %</td></tr>";
				wkk14 += "<tr><td width=50%><font color=red><b>Duration Time: </b></font></td><td>" + Math.floor(strip_duration * 10)/10 + " Seconds</td></tr></table>";
			}

			if (431 == n_A_ActiveSkill)
			{
				i = 1;
				strip_rate = n_A_DEX / (4 * (7 - n_A_ActiveSkillLV)) + n_A_LUK / (4 * (6 - n_A_ActiveSkillLV));
				strip_rate = Math.max(0, strip_rate + n_A_BaseLV - (n_B[8] * strip_rate / 100) - n_B[11] - n_B[5]);
				strip_duration = 30;
				
				wkk14 += "<br><table border=0><tr><td width=50%><b>Chance to Strip [Weapon]: </b></td><td>" + Math.floor(strip_rate * 10)/10 + " %</td></tr>";
				wkk14 += "<tr><td width=50%><font color=red><b>Duration Time: </b></font></td><td>" + strip_duration + " Seconds</td></tr></table>";
			}

			if (!i)
			{
				myInnerHtml("A_KakutyouSel","",0);
				wkk14 = "Not Available for this Class";
			}
		}
		myInnerHtml("A_KakutyouData",wkk14,0);
	}
	else if(wKK == 15){
		var wkk15;

		Flv1 = eval(document.calcForm.Flv.value);
		FStat1 = eval(document.calcForm.FStat.value);
		CKit1 = eval(document.calcForm.CKit.value);
		CExp1 = eval(document.calcForm.CExp.value);
		adopted = eval(document.calcForm.A_youshi.checked);

		if(CExp1 > 2000){CExp1 = 2000;}

		if(adopted){adp = 0.7;}else{adp = 1;}

		if(Flv1 == 1 && FStat1 == 4){ItemN = 2;}
		if((Flv1 == 1 && FStat1 != 4) || (Flv1 == 2 && FStat1 == 4) || (Flv1 == 3 && FStat1 == 4)){ItemN = 3;}
		if((Flv1 == 2 && FStat1 != 4) || (Flv1 == 3 && (FStat1 == 2 || FStat1 == 3 || FStat1 == 6)) || (Flv1 == 6 && FStat1 == 2)){ItemN = 4;}
		if((Flv1 == 3 && (FStat1 == 1 || FStat1 == 5)) || (Flv1 == 4 && (FStat1 != 1 || FStat1 != 5)) || (Flv1 == 5 && FStat1 != 5) || (Flv1 == 6 && (FStat1 != 2 || FStat1 != 5)) || (Flv1 == 7 && FStat1 == 4)){ItemN = 5;}
		if((Flv1 == 4 && (FStat1 == 4 || FStat1 == 5)) || (Flv1 == 5 && FStat1 == 5) || (Flv1 == 6 && FStat1 == 5) || (Flv1 == 7 && FStat1 != 4) || (Flv1 == 8 && FStat1 != 5 )){ItemN = 6;}
		if((Flv1 == 8 && FStat1 == 5) || Flv1 == 9){ItemN = 7;}
		if(Flv1 == 10){ItemN = 8;}

		Food_Powa = (1200 * (CKit1+1)) + (20*(n_A_BaseLV+1)) + (20*(n_A_DEX)) - (Flv1*400) - (10*(100-(n_A_LUK + 1))) - (500*(ItemN-1));

		Food_MIN = Math.round(Food_Powa + (100*(0 + (6 + CExp1/80)))*adp)/100;
		Food_AVG = Math.round(Food_Powa + (100*(12 + (6 + CExp1/80)))*adp)/100;
		Food_MAX = Math.round(Food_Powa + (100*(24 + (6 + CExp1/80)))*adp)/100;
		FDA1 = Math.round((Food_MIN - 5)*100)/100;
		FDA2 = Math.round((Food_MIN - 1)*100)/100;
		FDB1 = Math.round((Food_AVG - 5)*100)/100;
		FDB2 = Math.round((Food_AVG - 1)*100)/100;
		FDC1 = Math.round((Food_MAX - 5)*100)/100;
		FDC2 = Math.round((Food_MAX - 1)*100)/100;

		if(Food_MIN <= 0){Food_MIN = 0;FDA1 = 0;FDA2 = 0;}
		if(FDA1 <= 0){FDA1 = 0;}
		if(FDA2 <= 0){FDA1 = 0;FDA2 = 0;}
		if(Food_AVG <= 0){Food_AVG = 0;FDB1 = 0;FDB2 = 0;}
		if(FDB1 <= 0){FDB1 = 0;}
		if(FDB2 <= 0){FDB1 = 0;FDB2 = 0;}
		if(Food_MAX <= 0){Food_MAX = 0;FDC1 = 0;FDC2 = 0;}
		if(FDC1 <= 0){FDC1 = 0;}
		if(FDC2 <= 0){FDC1 = 0;FDC2 = 0;}

		if(Food_MIN > 100){Food_MIN = 100;}
		if(FDA1 > 100){FDA1 = 100;}
		if(FDA2 > 100){FDA2 = 100;}
		if(Food_AVG > 100){Food_AVG = 100;}
		if(FDB1 > 100){FDB1 = 100;}
		if(FDB2 > 100){FDB2 = 100;}
		if(Food_MAX > 100){Food_MAX = 100;}
		if(FDC1 > 100){FDC1 = 100;}
		if(FDC2 > 100){FDC2 = 100;}

		if(CKit1 == 4){
			wkk15 = "<table border=0><tr><td><b>Success Rate: </b>100%</td>";
			wkk15 += "</tr></table>";
		}else{
			wkk15 = "<table border=0><tr><td><b>Success Rate: </b><br></td>";
			wkk15 += "<td>Minimum: " + Food_MIN + "% [" + FDA1 + "% ~ " + FDA2 + "%]</td>";
			wkk15 += "<td>Average: " + Food_AVG + "% [" + FDB1 + "% ~ " + FDB2 + "%]</td>";
			wkk15 += "<td>Maximum: " + Food_MAX + "% [" + FDC1 + "% ~ " + FDC2 + "%]</td>";
			wkk15 += "</tr></table>";
		}

		myInnerHtml("A_KakutyouData",wkk15,0);
	}
	else if(wKK == 16){
		var wkk16="";
		if(n_A_JOB==9 || n_A_JOB==23){
			var wX = 100+n_tok[94];

			wkk16+="<table border=0>";
			wkk16+="<tr><td><b>Sanctuary Level 1</b></td><td>"+Math.floor(100 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 2</b></td><td>"+Math.floor(200 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 3</b></td><td>"+Math.floor(300 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 4</b></td><td>"+Math.floor(400 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 5</b></td><td>"+Math.floor(500 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 6</b></td><td>"+Math.floor(600 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 7</b></td><td>"+Math.floor(777 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 8</b></td><td>"+Math.floor(777 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 9</b></td><td>"+Math.floor(777 * wX /100)+"</td></tr>";
			wkk16+="<tr><td><b>Sanctuary Level 10</b></td><td>"+Math.floor(777 * wX /100)+"</td></tr>";
			wkk16+="</table>";
			myInnerHtml("A_KakutyouData",wkk16,0);
		}else
			myInnerHtml("A_KakutyouData","Not Available for this Class",0);
	}
	else if(wKK == 17) // Drain Rate
	{
		wkk17 = "";
		if (n_Enekyori == 2 && 162 != n_A_ActiveSkill)
			myInnerHtml("A_KakutyouData","Skill not eligible for drain",0);
		else if (n_tok[380] || n_tok[382])
		{
			// Left hand carding are managed independently on left hand damage
			lh_hp_drain_value = 0;
			lh_sp_drain_value = 0;
			lh_hp_drain_chance = 0;
			lh_sp_drain_chance = 0;
			
			if (n_Nitou)
			{
				left_hand_weapon = [...ItemOBJ[n_A_Equip[1]], ...cardOBJ[n_A_card[4]], ...cardOBJ[n_A_card[5]], ...cardOBJ[n_A_card[6]], ...cardOBJ[n_A_card[7]]];
				
				for (i = 11; i < left_hand_weapon.length; ++i)
				{

					if (left_hand_weapon[i] == 380)
						lh_hp_drain_chance += left_hand_weapon[++i];
					else if (left_hand_weapon[i] == 381)
						lh_hp_drain_value += left_hand_weapon[++i];
					else if (left_hand_weapon[i] == 382)
						lh_sp_drain_chance += left_hand_weapon[++i];
					else if (left_hand_weapon[i] == 383)
						lh_sp_drain_value += left_hand_weapon[++i];
				}
			}
			
			hp_drain_value = Math.min(100, n_tok[381] - lh_hp_drain_value);
			sp_drain_value = Math.min(100, n_tok[383] - lh_sp_drain_value);
			hp_drain_chance = Math.min(100, n_tok[380] - lh_hp_drain_chance);
			sp_drain_chance = Math.min(100, n_tok[382] - lh_sp_drain_chance);
			
			// Mjolnir#84#11th Bonus - Reduce HP leech bonus by 50%
			// Eversong Greaves#1383#2nd Bonus - Reduce HP leech bonus by 50% under union
			if ((SkillSearch(364) && 1383 == n_A_Equip[8] && SQI_Bonus_Effect.findIndex(x => x == 2) > -1) ||
				(84 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 11) > -1))
				hp_drain_value = Math.floor(hp_drain_value / 2);
			
			monsters_count = eval(document.calcForm.A_KakutyouSelNum.value)
			
			if (typeof monsters_count == 'undefined' || monsters_count < 1)
			{
				monsters_count = 1;
				document.calcForm.A_KakutyouSelNum.value = 1;
			}
			
			avergeAtk = parseInt(document.getElementById("strID_1").textContent);
			
			if (avergeAtk >= 0  && (!n_Nitou || typeof w_left_Aveatk != 'undefined'))
			{
				critAtk = parseInt(document.getElementById("CRIATK").textContent);
				critChance = parseInt(document.getElementById("CRInum").textContent);
				
				if(critAtk>=0 && critChance)
					avergeAtk = avergeAtk * (1 - critChance / 100) + critAtk * critChance / 100;

				wkk17+="<table border=0>";
				wkk17+="<tr><td><b>HP</b></td>"+"<td></td>"+"<td><b>SP</b></td></tr>";
				wkk17+="<tr><td>Chance: " + hp_drain_chance + "% " + (n_Nitou ? "(" + lh_hp_drain_chance + "%)" : "") + "</td>"+"<td></td>"+"<td>Chance: " + sp_drain_chance + "% " + (n_Nitou ? "(" + lh_sp_drain_chance + "%)" : "") + "</td></tr>";
				wkk17+="<tr><td>Absorb " + hp_drain_value + "% " + (n_Nitou ? "(" + lh_hp_drain_value + "%)" : "") + " of the physical damage inflicted on the enemy as HP</td>"+"<td></td>"+"<td>Absorb " + sp_drain_value + "% " + (n_Nitou ? "(" + lh_sp_drain_value + "%)" : "") + " of the physical damage inflicted on the enemy as SP</td></tr>";
				wkk17+="<tr><td>Result: ~<b>"+Math.floor(monsters_count * hp_drain_chance * hp_drain_value * avergeAtk / 10000) + "</b> out of "+Math.floor(monsters_count * hp_drain_value * avergeAtk / 100)+" per hit";
				wkk17+= (n_Nitou ? " (~<b>"+Math.floor(monsters_count * lh_hp_drain_chance * lh_hp_drain_value * w_left_Aveatk / 10000) + "</b> out of "+ Math.floor(monsters_count * lh_hp_drain_value * w_left_Aveatk / 100) +" per hit)": "") + "</td><td></td>";
				wkk17+="<td>Result: ~<b>"+Math.floor(monsters_count * sp_drain_chance * sp_drain_value * avergeAtk / 10000) + "</b> out of "+ Math.floor(monsters_count * sp_drain_value * avergeAtk / 100) +" per hit"
				wkk17+= (n_Nitou ? " (~<b>"+Math.floor(monsters_count * lh_sp_drain_chance * lh_sp_drain_value * w_left_Aveatk / 10000) + "</b> out of "+ Math.floor(monsters_count * lh_sp_drain_value * w_left_Aveatk / 100) +" per hit)": "") + "</td></tr>";
				
				left_hand_dps = Math.floor(n_Nitou ? n_Delay[1] * w_left_Aveatk * w_HIT_HYOUJI / 100 : 0);
				dps = parseInt(document.getElementById("AveSecondATK").textContent) - left_hand_dps;
				
				if (dps>=0)
				{
					wkk17+="<tr><td>~<b>"+Math.floor(monsters_count * hp_drain_chance * hp_drain_value * dps / 10000) + (n_Nitou ? " </b>(~<b>"+Math.floor(monsters_count * lh_hp_drain_chance * lh_hp_drain_value * left_hand_dps / 10000) + "</b>)" : "") + " per second</td>";
					wkk17+="<td></td>"+"<td>~<b>"+Math.floor(monsters_count * sp_drain_chance * sp_drain_value * dps / 10000) + (n_Nitou ? "</b> (~<b>"+Math.floor(monsters_count * lh_sp_drain_chance * lh_sp_drain_value * left_hand_dps / 10000) + "</b>)	" : "") + " per second</td></tr>";
				}
				wkk17+="</table>";
				
				myInnerHtml("A_KakutyouData",wkk17,0);
			}
			else
				myInnerHtml("A_KakutyouData","Invalid combat context",0);
		}
		else
			myInnerHtml("A_KakutyouData","Not available without drain item",0);
	}
	else if(wKK == 18)
	{	
		potion_rank = eval(document.calcForm.potion_rank.value);
		selected_item = eval(document.calcForm.selected_item.value);
		hp_recovery_lv = eval(document.calcForm.hp_recovery_lv.value);
		sp_recovery_lv = eval(document.calcForm.sp_recovery_lv.value);
		heal_rate_bonus = eval(document.calcForm.heal_rate_bonus.value);
		learning_potion_lv = eval(document.calcForm.learning_potion_lv.value);
		rogue_spirit = eval(document.calcForm.rogue_spirit.value) && n_A_JobSearch2() == 14;
		
		item_id = ITEM_HEAL[selected_item][0]
		item_weight = Math.max(0.1, ITEM_HEAL[selected_item][5])
		
		// Retrieve all items bonus list
		equipped_items = n_A_Equip.map(x => ItemOBJ[x]);
		
		// Retrieve all cards bonus list
		equipped_cards = n_A_card.map(x => cardOBJ[x]);
		
		// Merge into one unique list to simplify underneath reduce
		active_bonus = equipped_items.concat(equipped_cards);
		
		// Include pet bonus as well
		active_bonus.push(PET_OBJ[n_A_PassSkill8[0]]);

		if (typeof heal_rate_bonus == 'undefined' || heal_rate_bonus < 0)
		{
			heal_rate_bonus = 0;
			document.calcForm.heal_rate_bonus.value = 0;
		}
		
		if (ITEM_HEAL[selected_item][1]) // HP Recovery
			bonus = 100 + n_A_VIT*2 + hp_recovery_lv * 10 + learning_potion_lv * 5;
		else // SP Recovery
			bonus = 100 + n_A_INT*2 + sp_recovery_lv * 10 + learning_potion_lv * 5;

		if (potion_rank && (selected_item && selected_item < 8))
		{
			bonus *= (1 + potion_rank * 0.25);
			if (rogue_spirit && ITEM_HEAL[selected_item][1])
				bonus *= 2;
		}
		
		function reduce_item_bonus(acc, x, id, tok)
		{
			i = -1;
			
			while ((i = x.indexOf(tok, i + 1)) != -1)
			{
				if (x[i+1].constructor === Array)
				{
					if (x[i+1][2]) 	// Group bonus
						acc[2] += (x[i+1][0] == id ? x[i+1][1] : 0);
					else 			// Individual bonus
						acc[1] += (x[i+1][0] == id ? x[i+1][1] : 0);
				}
				else // Global bonus
					acc[0] += x[i+1];
			}
			
			return acc;
		}

		item_bonus = active_bonus.reduce((acc, x) => reduce_item_bonus(acc, x, item_id, ITEM_HEAL[selected_item][1] ? 218 : 219), [0, 0, 0]);
		
		// Global healing item effectiveness bonus, only applied for HP Recovery
		bonus += (ITEM_HEAL[selected_item][1] ? item_bonus[0] + n_tok[218] : 0);

		// Item group effectiveness bonus
		bonus = Math.floor(bonus * (100 + item_bonus[1]) / 100);
		
		// Individual item effectiveness bonus
		// #43 - Yoyo + Monkey King's Helm#1761~1765 - Banana Juice#532 heals additional 200% when equipped with Loyal Yoyo pet
		if (ITEM_HEAL[selected_item][0] == 532 && n_A_PassSkill8[0] == 43 && (EquipNumSearch(1761) || EquipNumSearch(1762) || EquipNumSearch(1763) || EquipNumSearch(1764) || EquipNumSearch(1765)))
			item_bonus[2] += 200;
		
		bonus = Math.floor(bonus * (100 + item_bonus[2]) / 100);
			
		// Apply SC_INCHEALRATE bonus
		bonus = Math.floor(bonus * (100 + heal_rate_bonus) / 100);
		
		min_heal = Math.floor(ITEM_HEAL[selected_item][2] * bonus / 100);
		max_heal = Math.floor(ITEM_HEAL[selected_item][3] * bonus / 100);
		
		wkk18 =  '<table width=100% border=0><tr><td width=20%><b>Heal: </b>' + min_heal + '~' + max_heal + '</td>';
		wkk18 += '<td width=31%><b>Total Item Healing Bonus: </b>' + bonus + '%</td>';
		wkk18 += '<td width=35%><b>Weight Ratio: </b>' + Math.round(min_heal / item_weight) + '~' + Math.round(max_heal / item_weight) + '</td></tr></table>';
		myInnerHtml("A_KakutyouData",wkk18,0);
  }
	else if(wKK == 19){ // Steal Calculator
		myInnerHtml("A_KakutyouData","",0);
		document.getElementById("playerDexSteal").innerHTML = n_A_DEX;
		monsterStolen = MonsterOBJ[eval(document.calcForm.monsterStolen.value)];
		stealLevel = eval(document.calcForm.stealLevel.value);
		manuallyInsertDex = eval(document.calcForm.manuallyInsertDex.checked);
		playerDex = n_A_DEX;
		if (manuallyInsertDex) {
			playerDex = eval(document.calcForm.playerDexStealManual.value);
		}
		monsterDex = monsterStolen[10];
		document.getElementById("outputPlayerDexStealCalc").innerHTML = "<b>Player DEX: </b> " + playerDex + "</b>";
		document.getElementById("outputMonsterDexStealCalc").innerHTML = "<b>Monster DEX: </b> " + monsterDex + "</b>";
		if (monsterStolen[23] != 0) {
			document.getElementById("outputMonsterGifStealCalc").innerHTML = "<img src=\"https://talontales.com/panel/data/monsters/"+monsterStolen[23]+".gif\" alt=\"no picture available =(\">";
		} else {
			document.getElementById("outputMonsterGifStealCalc").innerHTML = "<img src=\"\" alt=\"no picture available =(\">";
		}
		var tblStealCalcRight = document.getElementById("tblStealCalcRight");
		if (monsterStolen[19]) {
			document.getElementById("addRemStealCalc").style = "display:none";
			while (tblStealCalcRight.rows.length > 1) {
				tblStealCalcRight.deleteRow(-1);
			}
			var cell = tblStealCalcRight.insertRow(-1).insertCell(0);
			cell.colSpan="5";
			cell.innerHTML += "Cannot steal boss monster";
		} else {
			var baseRate = Math.floor((playerDex - monsterDex)/2 + stealLevel*6 + 4);
			var individualSuccess = [];
			var stealSuccess = [];
			if (baseRate < 1) {
				for (i = 0; i < tblStealCalcRight.rows.length-1; ++i) {
					individualSuccess[i] = 0;
					stealSuccess[i] = 0;
				}
			} else {
				for (i = 0; i < tblStealCalcRight.rows.length-1; ++i) {
					var itemDropRate = 0;
					if (monsterStolen[24]) {
						itemDropRate = monsterStolen[25 + i*2];
					} else {
						itemDropRate = eval(tblStealCalcRight.rows[i+1].getElementsByTagName("input")[0].value);
					}
					individualSuccess[i] = Math.ceil(itemDropRate * baseRate);
					if (individualSuccess[i] > 10000) individualSuccess[i] = 10000;
					if (individualSuccess[i] < 0) individualSuccess[i] = 0;
				}
				for (i = 0; i < tblStealCalcRight.rows.length-1; ++i) {
					if (i > 6) { // only the first 7 slots can be stolen
						stealSuccess[i] = 0;
						continue;
					}
					stealSuccess[i] = individualSuccess[i];
					for (var j = i - 1; j >= 0; --j) {
						stealSuccess[i] *= (10000 - individualSuccess[j])/10000.;
					}
					if (stealSuccess[i] > 10000) stealSuccess[i] = 10000;
					if (stealSuccess[i] < 0) stealSuccess[i] = 0;
				}
			}
			for (i = 0; i < stealSuccess.length; ++i) {
				if (i == 9 || monsterStolen[24 + i*2] == 0) {
					break;
				}
				tblStealCalcRight.rows[i+1].cells[3].innerHTML = (+(stealSuccess[i]/100.)).toFixed(4) + "%";
				tblStealCalcRight.rows[i+1].cells[4].innerHTML = (+(individualSuccess[i]/100.)).toFixed(2) + "%";
			}
		}
	}
	else if (wKK == 20) // Refine System
	{
		refine_rates = [
			[100,100,100,100,60,40,40,20,20,10],		// Armor
			[100,100,100,100,100,100,100,60,40,20],	// Weapon Lv1
			[100,100,100,100,100,100,60,40,20,20],	// Weapon Lv2
			[100,100,100,100,100,60,50,20,20,20],	// Weapon Lv3
			[100,100,100,100,60,40,40,20,20,10]];	// Weapon Lv4
		
		refine_fees = [	2000,	// All Armor Types - Elunium (Monster drop) + 2,000 Z Fee
						50,		// Weapon Lv1 - Phracon (200 Z from NPC Shop) + 50 Z Fee
						200,	// Weapon Lv2 - Emveretarcon (1,000 Z from NPC Shop) + 200 Z Fee
						5000,	// Weapon Lv3 - Oridecon (Monster drop) + 5,000 Z Fee
						20000];	// Weapon Lv4 - Oridecon + 20,000 Z Fee
		
		refine_catalysts = ["Elunium", "Phracon", "Emveretarcon", "Oridecon", "Oridecon"];
		
		equipment_type = eval(document.calcForm.equipment_type_select.value);
		selected_equipment = eval(document.calcForm.equipment_select.value);
		item_cost = eval(document.calcForm.refine_item_cost.value);
		catalyst_cost = eval(document.calcForm.refine_catalyst_cost.value);
		refine_rate = refine_rates[equipment_type];
		npc_refine = document.calcForm.npc_refine_check.checked;
		
		smith_job_lvl = eval(document.calcForm.smith_jlvl_select.value) + 1;
		smith_bonus = (smith_job_lvl - 50) / 2;
		smith_bonus = npc_refine ? 0 : Math.sign(smith_bonus) * Math.floor(Math.abs(smith_bonus));
		
		refine_table = document.getElementById("refine_table");
		refine_header = document.getElementById("refine_system_header");
		
		function print_number_with_comma(x)
		{
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		
		if (equipment_type) // Only applied to weapon refine
		{
			refine_header.rows[0].cells[7].style.visibility = "";
			refine_header.rows[1].cells[5].style.visibility = "";
			refine_rate = refine_rate.map(x => Math.max(Math.min(x + smith_bonus, 100), 0));
		}
		else
		{
			refine_header.rows[0].cells[7].style.visibility = "hidden";
			refine_header.rows[1].cells[5].style.visibility = "hidden";
		}
		
		// Update refine header display
		refine_header.rows[0].cells[2].innerHTML = "<a href=\"https://talontales.com/panel/?module=item&action=view&id=" + selected_equipment + "/\" target=\"_blank\"><img src=\"https://talontales.com/panel/data/items/icons/" + selected_equipment + ".png\" alt=\"no picture available =(\" style='text-decoration: none;height: auto;width: 100%;'></a>";
		refine_header.rows[1].cells[2].innerHTML = "<td> " + 	refine_catalysts[equipment_type] + " cost : </td>";
		
		// Update refine table display
		refine_table.rows[1].cells[5].innerHTML = "<b>Average " + refine_catalysts[equipment_type] + " Required</b>";
		refine_table.rows[1].cells[6].innerHTML = "<b>Theoretical " + refine_catalysts[equipment_type] + " Cost</b>";

		for (i = 0; i < 10; ++i)
		{
			cumulated_rate = refine_rate.reduce(function (a, b, c) { return c > i ? a : a * b/100;});
			items_required = (100 / cumulated_rate).toPrecision(4);
			
			cumulated_catalysts = refine_rate.map(function (x, c) { return Math.ceil((c > i ? 0 : items_required) * x / 100);});
			catalysts_required = cumulated_catalysts.reduce(function (a, b) { return a + b;});
			
			theoretical_item_cost = item_cost * items_required;
			theoretical_catalyst_cost = catalyst_cost * catalysts_required;
			refine_fee = (npc_refine || equipment_type == 0 ? refine_fees[equipment_type] : 0) * catalysts_required;
			total_cost = theoretical_item_cost + theoretical_catalyst_cost + refine_fee;
			
			refine_table.rows[i + 2].cells[1].innerHTML = refine_rate[i] + "%";
			refine_table.rows[i + 2].cells[2].innerHTML = cumulated_rate.toPrecision(4) + "%";
			refine_table.rows[i + 2].cells[3].innerHTML = items_required;
			refine_table.rows[i + 2].cells[4].innerHTML = print_number_with_comma(Math.round(theoretical_item_cost)) + " z";
			refine_table.rows[i + 2].cells[5].innerHTML = print_number_with_comma(Math.round(catalysts_required));
			refine_table.rows[i + 2].cells[6].innerHTML = print_number_with_comma(Math.round(theoretical_catalyst_cost)) + " z";
			refine_table.rows[i + 2].cells[7].innerHTML = print_number_with_comma(Math.round(total_cost)) + " z";
		}
		
		myInnerHtml("A_KakutyouData", "",0);
	}
	else if(wKK == 21) // homunculus Analysis
	{
		stat_density_matrice = [];
		on_homunculus_change();
	}
}

function manage_sqi_bonus()
{
	// Mjolnir#84#11th Bonus - For each mastered Forge Passive add ATK + 10 and DEF Pierce + 2%
	if (84 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 11) > -1)
	{
		forge_passives_mastered = SkillSearch(311);
		n_tok[17] += 10 * forge_passives_mastered;
		n_tok[21] += 2 * forge_passives_mastered;
		n_tok[22] += 2 * forge_passives_mastered;
	}
	
	// Nibelungen#1386 - Knight/Lord Knight
	if (1386 == n_A_Equip[0])
	{
		// #3rd Bonus - Increase damage inflicted on Large size monster by 15% when using [Pierce#70] or [Brandish Spear#73]
		if (2 == n_B[4] && (70 == n_A_ActiveSkill || 73 == n_A_ActiveSkill) && SQI_Bonus_Effect.findIndex(x => x == 3) > -1)
			n_tok[29] += 15;
		
		// #11th Bonus - 50% less cast time with [Spiral Pierce#259]; but disables Berzebub Card. 
		if (259 == n_A_ActiveSkill && SQI_Bonus_Effect.findIndex(x => x == 11) > -1)
			n_tok[73] += 30 * CardNumSearch(141);
	}

	// Scouter#1387 - Gunslinger
	if (45 == n_A_JOB && 1387 == n_A_Equip[3])
	{
		// #3rd Bonus - CRIT + 15 (30 with Rifles) and 20% more damage with Critical Hits
		if (18 == n_A_WeaponType && SQI_Bonus_Effect.findIndex(x => x == 3) > -1)
			n_tok[10] += 15;
		
		// #4th Bonus - Shotgun Equipped: ASPD + 25%
		if (19 == n_A_WeaponType && SQI_Bonus_Effect.findIndex(x => x == 4) > -1)
			n_tok[12] += 25;

		// #6th Bonus - Gatling Gun Equipped: 20% more damage with Long Range Attacks and Critical Hits
		if (20 == n_A_WeaponType && SQI_Bonus_Effect.findIndex(x => x == 6) > -1)
		{
			n_tok[25] += 20;
			n_tok[70] += 20;
		}

		// #13th Bonus - Base AGI >= 88: Immunity to Stun Status. Base VIT >= 88: Immunity to Sleep Status
		if (SQI_Bonus_Effect.findIndex(x => x == 13) > -1)
		{
			n_tok[151] += SU_AGI >= 87 ? 100 : 0;
			n_tok[155] += SU_VIT >= 87 ? 100 : 0;
		}
	}

	// Eversong Greaves#1383 - Taekwon
	if (41 == n_A_JOB && 1383 == n_A_Equip[8])
	{
		// Base stats
		n_tok[8] += 75;  // HIT + 75
		n_tok[12] += 30; // ASPD + 30%
		
		// #1st Bonus - [Taekwon] +10% MaxHP/MaxSP
		if (SQI_Bonus_Effect.findIndex(x => x == 1) > -1)
		{
			n_tok[15] += 10;
			n_tok[16] += 10;
		}
		
		// #2nd Bonus - [Taekwon] Ignore 20% of enemy Defense
		if (SQI_Bonus_Effect.findIndex(x => x == 2) > -1)
		{
			n_tok[21] += 20;
			n_tok[22] += 20;
		}
	}
	
	// Eversong Greaves#1383 - Star Gladiator
	if (42 == n_A_JOB && 1383 == n_A_Equip[8])
	{
		// Base stats
		n_tok[5] += 10; // DEX + 10
		n_tok[6] += 15; // LUK + 15
		
		// #1st Bonus - [Star Gladiator] +20% MaxHP/MaxSP
		if (SQI_Bonus_Effect.findIndex(x => x == 1) > -1)
		{
			n_tok[15] += 20;
			n_tok[16] += 20;
		}
	}

	// Tome of Ymir#1391 - Sage/Professor
	if (1391 == n_A_Equip[0])
	{
		// #6th - Pierce 10% of enemy MDEF when using [Fire Bolt], [Cold Bolt], [Lightning Bolt], or [Earth Spike]
		if (SQI_Bonus_Effect.findIndex(x => x == 6) > -1 && (51 == n_A_ActiveSkill || 54 == n_A_ActiveSkill || 56 == n_A_ActiveSkill || 132 == n_A_ActiveSkill))
			n_tok[295] += 10;
		
		// #9th Bonus - Autospell#229 Mastered: Add ASPD + 12% and FLEE + 15 during [Autospell]
		if (SQI_Bonus_Effect.findIndex(x => x == 9) > -1 && 10 == SkillSearch(229))
		{
			n_tok[9] += 15;
			n_tok[12] += 12;
		}
	}
	
	// Artemis#1377 - Hunter/Sniper
	if (1377 == n_A_Equip[0])
	{
		// #8th Bonus - + 15 FLEE on [Wind Walk]
		if (SQI_Bonus_Effect.findIndex(x => x == 8) > -1 && SkillSearch(273))
			n_tok[9] += 15;
		
		// #9th Bonus - Reduces Thanatos Card effect by 15% for each equipped Thanatos Card
		if (SQI_Bonus_Effect.findIndex(x => x == 9) > -1)
		{
			let thanatos_cards_equipped = CardNumSearch(166);
			n_tok[21] -= 15 * thanatos_cards_equipped;
			n_tok[22] -= 15 * thanatos_cards_equipped;
		}
	}
	
	// Aegis Shield#1376 - Crusader/Paladin
	if (1376 == n_A_Equip[5])
	{
		// #10th Bonus - Increase effectiveness of [Heal] by 20% (10% in PvP/WoE)
		if (Taijin && SQI_Bonus_Effect.findIndex(x => x == 10) > -1)
			n_tok[90] -= 10;

		// #11th Bonus - 50% less cast time with [Shield Chain#324]; but disables Berzebub Card. 
		if (324 == n_A_ActiveSkill && SQI_Bonus_Effect.findIndex(x => x == 11) > -1)
			n_tok[73] += 30 * CardNumSearch(141);
	}
	
	// Stats bonus disabled for Super Novice
	if (20 == n_A_JOB)
	{
		if (84 == n_A_Equip[0]) // Mjolnir#84
		{
			n_tok[5] -= 15; // DEX + 5
			n_tok[6] -= 15; // LUK + 5
			n_tok[8] -= 30; // HIT bonus disabled
		}	
		else if (1380 == n_A_Equip[0]) // Djinn#1380
		{
			n_tok[5] -= 10; // DEX + 5
			n_tok[6] -= 15; // LUK + 5
		}
		else if (1382 == n_A_Equip[0]) // Evangelist#1382
		{
			n_tok[4] -= 10; // INT + 5
			n_tok[5] -= 10; // DEX + 5
			n_tok[8] -= 35; // HIT bonus disabled
		}
		else if (1384 == n_A_Equip[0]) // Ghostdancer#1384
		{
			n_tok[4] -= 10; // INT + 5
			n_tok[5] -= 10; // DEX + 5
			n_tok[89] -= 5; // MATK + 15%
		}
		else if (1387 == n_A_Equip[3]) // Scouter#1387
		{
			n_tok[12] -= 10; // ASPD + 15%
			n_tok[15] -= 20; // MHP bonus disabled
			n_tok[16] -= 20; // MSP bonus disabled
			n_tok[77] -= 20; // Non-boss resistance bonus disabled
			n_tok[79] -= 20; // Boss resistance bonus disabled
		}
		else if (1389 == n_A_Equip[0]) // Staff of Magi#1389
			n_tok[5] -= 10; // DEX + 5
	}
}

function Kanma(num){
	var str = "";
	var x = new Array();
	if(num < 0){
		num = num * -1;
		str += "-";
	}
	for(var i=0;Math.floor(num / 1000) != 0;i++){
		var w = (num % 1000);
		if(w == 0){
			x[i] = ",000";
		}else if(w < 10){
			x[i] = ",00" + w;
		}else if(w < 100){
			x[i] = ",0" + w;
		}else{
			x[i] = "," + w;
		}
		num = Math.floor(num / 1000);
	}
	x[i] = num;
	while(i>=0){
		str += x[i];
		i--;
	}
	return str;
}

function update_pp_calc()
{
	is_source = eval(document.calcForm.pp_source.checked);
	is_target = eval(document.calcForm.pp_target.checked);
		
	if (is_source && !(n_A_JOB == 19 || n_A_JOB == 33))
	{
		is_source = false;
		document.calcForm.pp_source.checked = false;
	}
	
	if (is_source) // Update source stats accordingly
	{
		document.calcForm.pp_source_lv.value = n_A_BaseLV;
		document.calcForm.pp_heal_rate_bonus.value = n_tok[93];
		document.calcForm.spp_heal_rate_bonus.value = n_tok[201];
		document.calcForm.pp_received_heal_rate_bonus.value = 0;
		document.calcForm.spp_received_heal_rate_bonus.value = 0;
		document.calcForm.pp_learning_potion_lv.value = SkillSearch(442);
	}
	
	if (is_target) // Update target stats accordingly
	{
		document.calcForm.pp_lv.value = 5;
		document.calcForm.spp_lv.value = 10;
		document.calcForm.pp_source_lv.value = 99;
		document.calcForm.pp_target_vit.value = n_A_VIT;
		document.calcForm.pp_target_int.value = n_A_INT;
		document.calcForm.pp_learning_potion_lv.value = 10;
		document.calcForm.pp_irp_lv.value = SkillSearch(5);
		document.calcForm.pp_isp_lv.value = SkillSearch(45);
		document.calcForm.pp_received_heal_rate_bonus.value = n_tok[199];
		document.calcForm.spp_received_heal_rate_bonus.value = n_tok[200];
	}
	
	if (EquipNumSearch(1737)) // Empty Liquor Bottle + Beer Hat
	{
		document.calcForm.pp_isp_lv.value = 10;
		document.calcForm.pp_irp_lv.value = 10;
	}
	else if (EquipNumSearch(1240)) // Beer Hat
	{
		document.calcForm.pp_isp_lv.value = 3;
		document.calcForm.pp_irp_lv.value = 3;
	}
}

function KakutyouKansuu2(){
	wKK = eval(document.calcForm.A_Kakutyou.value);
	if(wKK == 2){
		if(n_A_JOB==1||n_A_JOB==7||n_A_JOB==13||n_A_JOB==20||n_A_JOB==21||n_A_JOB==27){
			myInnerHtml("A_KakutyouSel","Increased HP Recovery Level: " + '<select name="A_KakutyouSelNum"onChange="KakutyouKansuu()"></select>',0);
			for(i=0;i<=10;i++)
				document.calcForm.A_KakutyouSelNum.options[i] = new Option(i,i);
			document.calcForm.A_KakutyouSelNum.value=10;
			return;
		}
		else if (EquipNumSearch(1737)) //Beer Hat + Empty Liquor Bottle Combo
			myInnerHtml("A_KakutyouSel","Increased HP Recovery Level: 10",0);
		else if (EquipNumSearch(1240)) //Beer Hat - [Loa] - 2018-07-04
			myInnerHtml("A_KakutyouSel","Increased HP Recovery Level: 3",0);
		else
			myInnerHtml("A_KakutyouSel","Not Available for this Class",0);
		
		return;
	}
	if(wKK == 3){
		if(n_A_JOB==5||n_A_JOB==9||n_A_JOB==11||n_A_JOB==18||n_A_JOB==20||n_A_JOB==23||n_A_JOB==25||n_A_JOB==32||n_A_JOB==39||n_A_JOB==44){
			SPRname = "Increased SP Recovery Level: ";
			if(n_A_JOB==44)
				SPRname = "Ninja Mastery Level: ";
			myInnerHtml("A_KakutyouSel",SPRname + '<select name="A_KakutyouSelNum"onChange="KakutyouKansuu()"></select>',0);
			for(i=0;i<=10;i++)
				document.calcForm.A_KakutyouSelNum.options[i] = new Option(i,i);
			document.calcForm.A_KakutyouSelNum.value=10;
			return;
		}
		else if (EquipNumSearch(1737)) //Beer Hat + Empty Liquor Bottle Combo
			myInnerHtml("A_KakutyouSel","Increased SP Recovery Level: 10",0);
		else if (EquipNumSearch(1240)) //Beer Hat - [Loa] - 2018-07-04
			myInnerHtml("A_KakutyouSel","Increased SP Recovery Level: 3",0);
		else
			myInnerHtml("A_KakutyouSel","Not Available for this Class",0);

		return;
	}
	if(wKK == 4){
		if(n_A_JOB==15||n_A_JOB==29){
			myInnerHtml("A_KakutyouSel","Spiritual Cadence Lv: " + '<select name="A_KakutyouSelNum"onChange="KakutyouKansuu()"></select>',0);
			for(i=0;i<=5;i++)
				document.calcForm.A_KakutyouSelNum.options[i] = new Option(i,i);
			document.calcForm.A_KakutyouSelNum.value=5;
			return;
		}else{
			myInnerHtml("A_KakutyouSel","Not Available for this Class",0);
			return;
		}
	}
	if(wKK == 5){
		if(n_A_JOB==6||n_A_JOB==12||n_A_JOB==19||n_A_JOB==20||n_A_JOB==26||n_A_JOB==33){
			// myInnerHtml("A_KakutyouSel","Enlarge Weight Limit Lv: " + '<select name="A_KakutyouSelNum"onChange="StAllCalc()"></select><BR>'
			// +"Enlarge Weight Limit R Lv: " + '<select name="A_KakutyouSelNum2"onChange="StAllCalc()"></select><BR>',0);
			myInnerHtml("A_KakutyouSel","Enlarge Weight Limit Lv: " + '<select name="A_KakutyouSelNum"onChange="KakutyouKansuu()"></select><BR>',0);
			// for(i=0;i<=10;i++)
			// 	document.calcForm.A_KakutyouSelNum2.options[i] = new Option(i,i);
			for(i=0;i<=10;i++)
				document.calcForm.A_KakutyouSelNum.options[i] = new Option(i,i);
			// if(n_A_JOB==20)
			// 	document.calcForm.A_KakutyouSelNum.value=0;
			// else
				document.calcForm.A_KakutyouSelNum.value=10;
		}else{
			// myInnerHtml("A_KakutyouSel","Enlarge Weight Limit R Lv: " + '<select name="A_KakutyouSelNum2"onChange="StAllCalc()"></select><BR>',0);
			// for(i=0;i<=10;i++)
			// 	document.calcForm.A_KakutyouSelNum2.options[i] = new Option(i,i);
			myInnerHtml("A_KakutyouSel","",0);
		}
		return;
	}
	if(wKK == 7){
		CBIstr = "<table border=0>";
		CBIstr += '<tr><td>Your Target: <select name="R_OBJ" onChange = "KakutyouKansuu()"></select><select name="S_OBJ" onChange = "KakutyouKansuu()"></select><select name="E_OBJ" onChange = "KakutyouKansuu()"></select><select name="B_OBJ" onChange = "KakutyouKansuu()"></select><select name="SP_OBJ" onChange = "KakutyouKansuu()"></select></td></tr>';
		CBIstr += "</table>";

		myInnerHtml("A_KakutyouData",CBIstr,0);

		for(i=0;i<SyuzokuOBJ.length;i++){
			document.calcForm.R_OBJ.options[i] = new Option(SyuzokuOBJ[i],i);
			document.calcForm.R_OBJ.value=0;}
		for(i=0;i<SizeOBJ.length;i++){
			document.calcForm.S_OBJ.options[i] = new Option(SizeOBJ[i],i);
			document.calcForm.S_OBJ.value=0;}
		for(i=0;i<ZokuseiOBJ2.length;i++){
			document.calcForm.E_OBJ.options[i] = new Option(ZokuseiOBJ2[i],i);
			document.calcForm.E_OBJ.value=0;}
		for(i=0;i<BossTypeOBJ.length;i++){
			document.calcForm.B_OBJ.options[i] = new Option(BossTypeOBJ[i],i);
			document.calcForm.B_OBJ.value=0;}
		for(i=0;i<SpecialTypeOBJ.length;i++){
			document.calcForm.SP_OBJ.options[i] = new Option(SpecialTypeOBJ[i],i);
			document.calcForm.SP_OBJ.value=0;}
		return;
	}
	if(wKK == 8){
		CBIstr = "<table>";
		CBIstr += '<tr><td>HP</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_HP" value="1" size=7></td><td>STR</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_STR" value="1" size=1></td>';
		CBIstr += '<td>Element</td><td><select name="EN_ELEM" onChange = "KakutyouKansuu()"></select><select name="EN_ELEM2" onChange = "KakutyouKansuu()"></select></td><td>Flee</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_FLEE" value="1" size=1></td></tr>';
		CBIstr += '<tr><td>VIT</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_VIT" value="1" size=1></td><td>INT</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_INT" value="1" size=1></td>';
		CBIstr += '<td>Race</td><td><select name="EN_RACE" onChange = "KakutyouKansuu()"></select></td><td>Perfect Dodge</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_PD" value="1" size=1></td></tr>';
		CBIstr += '<tr><td>DEF</td><td><select name="EN_DEF" onChange = "KakutyouKansuu()"></select></td><td>AGI</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_AGI" value="1" size=1></td>';
		CBIstr += '<td>Size</td><td><select name="EN_SIZE" onChange = "KakutyouKansuu()"></select></td><td>Demi-Human Resistance</td><td><select name="EN_DHR" onChange = "KakutyouKansuu()"></select> %</td></tr>';
		CBIstr += '<tr><td>MDEF</td><td><select name="EN_MDEF" onChange = "KakutyouKansuu()"></select></td><td>LUK</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_LUK" value="1" size=1></td>';
		CBIstr += '<td>Type</td><td><select name="EN_TYPE" onChange = "KakutyouKansuu()"></select></td><td>Long Range Resistance</td><td><select name="EN_RR" onChange = "KakutyouKansuu()"></select> %</td></tr>';
		CBIstr += '<tr><td>+ HP Gear</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_HP1" value="1" size=1></td><td>+% HP Gear</td><td><input type="text" onChange="KakutyouKansuu()" name="EN_HP2" value="1" size=1></td>';
		CBIstr += '<td>Energy Coat</td><td><select name="EN_EC" onChange = "KakutyouKansuu()"></select></td><td>Element Resistance</td><td><select name="EN_ELR1" onChange = "KakutyouKansuu()"></select><input type="text" onChange="KakutyouKansuu()" name="EN_ELR11" value="1" size=1></tr>';
		CBIstr += '<tr><td>Angelus</td><td><select name="EN_ANG" onChange = "KakutyouKansuu()"></select></td><td>Auto-Guard</td><td><select name="EN_AG" onChange = "KakutyouKansuu()"></select></td><td>Defender</td><td><select name="EN_DF" onChange = "KakutyouKansuu()"></select></td><td>Element Resistance</td><td><select name="EN_ELR2" onChange = "KakutyouKansuu()"></select><input type="text" onChange="KakutyouKansuu()" name="EN_ELR21" value="1" size=1></tr>';
		CBIstr += "</table>";
		myInnerHtml("A_KakutyouSel",CBIstr,0);

		for(i=0;i<=99;i++){
				document.calcForm.EN_DEF.options[i] = new Option(i,i);
				document.calcForm.EN_DEF.value=0;}
		for(i=0;i<=99;i++){
				document.calcForm.EN_MDEF.options[i] = new Option(i,i);
				document.calcForm.EN_MDEF.value=0;}
		for(i=0;i<SyuzokuOBJ.length;i++){
			document.calcForm.EN_RACE.options[i] = new Option(SyuzokuOBJ[i],i);
			document.calcForm.EN_RACE.value=0;}
		for(i=0;i<ZokuseiOBJ2.length;i++){
			document.calcForm.EN_ELEM.options[i] = new Option(ZokuseiOBJ2[i],i);
			document.calcForm.EN_ELEM.value=0;}
		for(i=0;i<4;i++){
			document.calcForm.EN_ELEM2.options[i] = new Option(i+1,i);
			document.calcForm.EN_ELEM2.value=0;}
		for(i=0;i<SizeOBJ.length;i++){
			document.calcForm.EN_SIZE.options[i] = new Option(SizeOBJ[i],i);
			document.calcForm.EN_SIZE.value=0;}
		for(i=0;i<=100;i++){
				document.calcForm.EN_DHR.options[i] = new Option(i,i);
				document.calcForm.EN_DHR.value=0;}
		for(i=0;i<BossTypeOBJ.length;i++){
			document.calcForm.EN_TYPE.options[i] = new Option(BossTypeOBJ[i],i);
			document.calcForm.EN_TYPE.value=0;}
		for(i=0;i<=100;i++){
				document.calcForm.EN_RR.options[i] = new Option(i,i);
				document.calcForm.EN_RR.value=0;}
		for(i=0;i<EnergyCoatOBJ.length;i++){
			document.calcForm.EN_EC.options[i] = new Option(EnergyCoatOBJ[i],i);
			document.calcForm.EN_EC.value=0;}
		for(i=0;i<ZokuseiOBJ2.length;i++){
			document.calcForm.EN_ELR1.options[i] = new Option(ZokuseiOBJ2[i],i);
			document.calcForm.EN_ELR1.value=0;}
		for(i=0;i<ZokuseiOBJ2.length;i++){
			document.calcForm.EN_ELR2.options[i] = new Option(ZokuseiOBJ2[i],i);
			document.calcForm.EN_ELR2.value=0;}
		for(i=0;i<=10;i++){
				document.calcForm.EN_ANG.options[i] = new Option(i,i);
				document.calcForm.EN_ANG.value=0;}
		for(i=0;i<=10;i++){
				document.calcForm.EN_AG.options[i] = new Option(i,i);
				document.calcForm.EN_AG.value=0;}
		for(i=0;i<=5;i++){
				document.calcForm.EN_DF.options[i] = new Option(i,i);
				document.calcForm.EN_DF.value=0;}
		for(i=0;i<=99;i++){
				document.calcForm.EN_MDEF.options[i] = new Option(i,i);
				document.calcForm.EN_MDEF.value=0;}

		EN_HP.value = CYE[0];
		return;
	}
	if(wKK == 11){
		var w;
		w = '<Font size="2">Current Base Exp<input type="text" name="A_KakutyouSelNum" value="0" size=4 onChange="KakutyouKansuu()" style="text-align : right;">%<BR>';
		w += 'Current Job Exp<input type="text" name="A_KakutyouSelNum2" value="0" size=4 onChange="KakutyouKansuu()" style="text-align : right;">%<BR></Font>';
		myInnerHtml("A_KakutyouSel",w,0);
		return;
	}
	if(wKK == 12)
	{
		pp_display =  'You are the : ';
		pp_display += '<input type="checkbox" id="pp_source" name="pp_source" value="pp_source" onclick=update_pp_calc()|KakutyouKansuu()><label for="pp_source">Source</label>';
		pp_display += '<input type="checkbox" id="pp_target" name="pp_target" value="pp_target" onclick=update_pp_calc()|KakutyouKansuu()><label for="pp_target">Target</label><br>';
		
		pp_display += "<table border=0>";
		pp_display += "<tr><td>Alchemist LV:</td>" + '<td><select name="pp_source_lv" onChange="KakutyouKansuu()"></select></td>';
		pp_display += '<td><input type="checkbox" id="pp_source_link" name="pp_source_link" value="pp_source_link" onclick=KakutyouKansuu()><label for="pp_source_link">Alchemist Soul Linked</label><td></td></td><td><label>(bonus only applied to Potion Pitcher)</label></td></tr>';
		
		pp_display += "<td>Slim Potion Pitcher:</td>" + '<td><select name="spp_lv" onChange="KakutyouKansuu()"></select></td>';
		pp_display += "<td>Potion Pitcher:</td>" + '<td><select name="pp_lv" onChange="KakutyouKansuu()"></select></td>';
		pp_display += "<td>Consumable:</td>" + '<td><select name="pp_consumable" onChange="KakutyouKansuu()"></select></td></tr>';
			
		pp_display += "<tr><td>Learning Potion:</td>" + '<td><select name="pp_learning_potion_lv" onChange="KakutyouKansuu()"></select></td></tr>';
		//pp_display += "<td></td><td></td><td>Ranked:</td>" + '<td><select name="pp_potion_rank" onChange="KakutyouKansuu()"></select></td></tr>'; Rank not taken into consideration for PP/SPP
				
		pp_display += "<tr><td>Increase Recuperative Power: " + '<td><select name="pp_irp_lv" onChange="KakutyouKansuu()"></select></td>';
		pp_display += "<td>Target's VIT:</td>" + '<td><select name="pp_target_vit" onChange="KakutyouKansuu()"></select></td>';
		pp_display +=  "<td>Increase PP Heal Rate:</td>" + '<td><input type="text" onChange="KakutyouKansuu()" name="pp_heal_rate_bonus" value="0" size=2>%</td></tr>';
		pp_display += "<tr><td>Increase Spiritual Power: " + '<td><select name="pp_isp_lv" onChange="KakutyouKansuu()"></select></td>';
		pp_display += "<td>Target's INT:</td>" + '<td><select name="pp_target_int" onChange="KakutyouKansuu()"></select></td>';
		pp_display +=  "<td>Increase PP Received Heal Rate:</td>" + '<td><input type="text" onChange="KakutyouKansuu()" name="pp_received_heal_rate_bonus" value="0" size=2>%</td></tr>';
		pp_display +=  "<tr><td/><td/><td/><td/><td>Increase SPP Heal Rate:</td>" + '<td><input type="text" onChange="KakutyouKansuu()" name="spp_heal_rate_bonus" value="0" size=2>%</td></tr>';
		pp_display +=  "<tr><td/><td/><td/><td/><td>Increase SPP Received Heal Rate:</td>" + '<td><input type="text" onChange="KakutyouKansuu()" name="spp_received_heal_rate_bonus" value="0" size=2>%</td></tr>';

		pp_display += "</table><br>";

		myInnerHtml("A_KakutyouSel", pp_display, 0);
		
		// Initialize static inputs
		for (i = 0; i <= 5; ++i)
			document.calcForm.pp_lv.options[i] = new Option(i,i);
		
		for (i = 0; i <= 10; ++i)
		{
			document.calcForm.spp_lv.options[i] = new Option(i,i);
			document.calcForm.pp_isp_lv.options[i] = new Option(i,i);
			document.calcForm.pp_irp_lv.options[i] = new Option(i,i);
			document.calcForm.pp_learning_potion_lv.options[i] = new Option(i,i);
		}
		
		for (i = 0; i <= 99; ++i)
			document.calcForm.pp_source_lv.options[i] = new Option(i,i);
		
		/* Rank not taken into consideration for PP/SPP
		for (i = 0; i < FAME_TOP.length; ++i)
			document.calcForm.pp_potion_rank.options[i] = new Option(FAME_TOP[i][1],i); */
			
		for (i = 0; i < PP_POTIONS.length; ++i)
			document.calcForm.pp_consumable.options[i] = new Option(PP_POTIONS[i][3],i);
		
		for (i = 0; i <= 200; ++i)
		{
			document.calcForm.pp_target_vit.options[i] = new Option(i,i);
			document.calcForm.pp_target_int.options[i] = new Option(i,i);
		}

		document.calcForm.pp_lv.value = 5;
		document.calcForm.spp_lv.value = 10;
		document.calcForm.pp_isp_lv.value = 0;
		document.calcForm.pp_irp_lv.value = 0;
		document.calcForm.pp_consumable.value = 3;
		document.calcForm.pp_target_vit.value = 1;
		document.calcForm.pp_target_int.value = 1;
		document.calcForm.pp_source_lv.value = 99;
		//document.calcForm.pp_potion_rank.value = 0; Rank not taken into consideration for PP/SPP
		document.calcForm.pp_learning_potion_lv.value = 10;
		
		if (n_A_JOB == 19 || n_A_JOB == 33)
			document.calcForm.pp_source.checked = true;
		else
			document.calcForm.pp_target.checked = true;
		
		update_pp_calc();
		return;
	}
	if(wKK == 13){
		if(n_A_JOB==12||n_A_JOB==26){
			forgetext = "<table border = 0><tr><td>Oridecon Research:</td>" + '<td><select name="A_OriR" onChange="KakutyouKansuu()"></select></td>';
			forgetext += "<td>Weapon Research:</td>" + '<td><select name="A_WepR" onChange="KakutyouKansuu()"></select></td>';
			forgetext +=  "<td>Smith Lvl:</td>" + '<td><select name="A_SmithT" onChange="KakutyouKansuu()"></select></td></tr>';
			forgetext +=  "<tr><td>Star Crumb:</td>" + '<td><select name="A_StarC" onChange="KakutyouKansuu()"></select></td>';
			forgetext +=  "<td>Elemental Stone:</td>" + '<td><select name="A_ElemS" onChange="KakutyouKansuu()"></select></td>';
			forgetext +=  "<td>Anvil:</td>" + '<td><select name="A_KakutyouSelNum" onChange="KakutyouKansuu()"></select></td></tr>';
			forgetext += "<tr><td>Iron Tempering</td>" + '<td><select name="A_Iron" onChange="KakutyouKansuu()"></select></td>';
			forgetext += "<td>Steel Tempering :</td>" + '<td><select name="A_Steel" onChange="KakutyouKansuu()"></select></td>';
			forgetext += "<td>Enchanted Stone Craft:</td>" + '<td><select name="A_StoneC" onChange="KakutyouKansuu()"></select></td></tr></table>';
			myInnerHtml("A_KakutyouSel",forgetext + "<br>",0);
			for(i=0;i<Anvil_Max;i++)
				document.calcForm.A_KakutyouSelNum.options[i] = new Option(Anvil_Type[i][2],i);
				document.calcForm.A_KakutyouSelNum.value=0;
			for(i=0;i<=5;i++)
				document.calcForm.A_OriR.options[i] = new Option(i,i);
				document.calcForm.A_OriR.value=0;
			for(i=0;i<=10;i++)
				document.calcForm.A_WepR.options[i] = new Option(i,i);
				document.calcForm.A_WepR.value=0;
			for(i=0;i<=3;i++)
				document.calcForm.A_StarC.options[i] = new Option(i,i);
				document.calcForm.A_StarC.value=0;
			for(i=0;i<=1;i++)
				document.calcForm.A_ElemS.options[i] = new Option(i,i);
				document.calcForm.A_ElemS.value=0;
			for(i=0;i<=3;i++)
				document.calcForm.A_SmithT.options[i] = new Option(i,i);
				document.calcForm.A_SmithT.value=0;
			for(i=0;i<=5;i++)
				document.calcForm.A_Iron.options[i] = new Option(i,i);
				document.calcForm.A_Iron.value=0;
			for(i=0;i<=5;i++)
				document.calcForm.A_Steel.options[i] = new Option(i,i);
				document.calcForm.A_Steel.value=0;
			for(i=0;i<=5;i++)
				document.calcForm.A_StoneC.options[i] = new Option(i,i);
				document.calcForm.A_StoneC.value=0;

		}else if(n_A_JOB==19||n_A_JOB==33){
			//custom Talon Tales Update 2014-09-29
			potiontext = "<table border=0><tr><td>Potion to Create:</td>" + '<td><select name="A_KakutyouSelNum" onChange="KakutyouKansuu()"></select></td>';
			potiontext += "<td>Learning Potion:</td>" + '<td><select name="A_PotionRLevel" onChange="KakutyouKansuu()"></select></td></tr>';
			potiontext += "<tr><td>Pharmacy:</td>" + '<td><select name="A_PreparePLevel" onChange="KakutyouKansuu()"></select></td></tr>';
			potiontext +=  "<tr><td>Homunculi Level:</td>" + '<td><select name="A_HomunLevel" onChange="KakutyouKansuu()"></select></td>';
			potiontext +=  "<td>Homunculi Evolved:</td>" + '<td><select name="A_HomunEvolved" onChange="KakutyouKansuu()"></select></td></tr></table>';

			myInnerHtml("A_KakutyouSel",potiontext + "<br>",0);
			for(i=0;i<Potion_Max;i++)
				document.calcForm.A_KakutyouSelNum.options[i] = new Option(Potion_Type[i][2],i);
				document.calcForm.A_KakutyouSelNum.value=0;
			for(i=0;i<=10;i++)
				document.calcForm.A_PotionRLevel.options[i] = new Option(i,i);
				document.calcForm.A_PotionRLevel.value=0;
			//custom Talon Tales Update 2014-09-29
			//before
			//for(i=0;i<=5;i++)
			//	document.calcForm.A_Van.options[i] = new Option(i,i);
			//	document.calcForm.A_Van.value=0;
			for(i=0;i<=10;i++)
				document.calcForm.A_PreparePLevel.options[i] = new Option(i,i);
				document.calcForm.A_PreparePLevel.value=0;
			//custom Talon Tales Update 2014-09-29
			//after
			for(i=0;i<=99;i++)
				document.calcForm.A_HomunLevel.options[i] = new Option(i,i);
				document.calcForm.A_HomunLevel.value=0;
			HomunEvolvedOption = ["no","yes"];
			for(i=0;i<=1;i++)
				document.calcForm.A_HomunEvolved.options[i] = new Option(HomunEvolvedOption[i],i);
				document.calcForm.A_HomunEvolved.value=0;
			//end
		}else{myInnerHtml("A_KakutyouSel","",0);}
		return;
	}
	if(wKK == 14){
		striptext = "";
		if(n_A_JOB == 14 || n_A_JOB == 28){
			striptext += "<table border=0><tr><td>Strip [Helm], [Armor], [Weapon] or [Shield] Level:</td>" + '<td><select name="S_LV" onChange="KakutyouKansuu()"></select></td>';
			striptext += "<td>Enemy DEX:</td>" + '<td><select name="E_DEX" onChange="KakutyouKansuu()"></select>';
			if(n_A_JOB == 28){
				striptext += "<tr><td>Full Strip Level:</td>" + '<td><select name="FS_LV" onChange="KakutyouKansuu()"></select>';}
			striptext += "</td></tr></table>";
			myInnerHtml("A_KakutyouSel",striptext,0);
			
			for(i=1;i<=5;i++)
				document.calcForm.S_LV.options[i-1] = new Option(i,i);
			document.calcForm.S_LV.value=1;
			for(i=0;i<=300;i++)
				document.calcForm.E_DEX.options[i] = new Option(i,i);
			document.calcForm.E_DEX.value = Taijin ? 0 : n_B[10];
			if(n_A_JOB == 28){
				for(i=1;i<=5;i++)
					document.calcForm.FS_LV.options[i-1] = new Option(i,i);
				document.calcForm.FS_LV.value=1;
			}
		}
		// Tome of Ymir#1391#4th Bonus - Enable [Strip Shield] Lv 3
		else if (CardNumSearch(157) || CardNumSearch(413) || (1391 == n_A_Equip[0] && SQI_Bonus_Effect.findIndex(x => x == 4) > -1))
		{
			striptext += "<table border=0><tr><td width=50%>Enemy DEX:</td>" + '<td><select name="E2_DEX" onChange="KakutyouKansuu()"></select></td></tr>';
			myInnerHtml("A_KakutyouSel",striptext,0);
			
			for(i=0;i<=300;i++)
				document.calcForm.E2_DEX.options[i] = new Option(i,i);
			document.calcForm.E2_DEX.value = Taijin ? 0 : n_B[10];
		}

		return;
	}
	if(wKK == 15){
		cooktext = "<table border=0><tr><td>Level of the Food:</td>" + '<td><select name="Flv" onChange="KakutyouKansuu()"></select></td>';
		cooktext += "<td>Stat of the Food:</td>" + '<td><select name="FStat" onChange="KakutyouKansuu()"></select><td></tr>';
		cooktext += "<tr><td>Cooking Kit Used:</td>" + '<td><select name="CKit" onChange="KakutyouKansuu()"></select></td>';
		cooktext +=  "<td>Cooking Experience:</td>" + '<td><input type="text" onChange="KakutyouKansuu()" name="CExp" value="0" size=2></td></tr></table>';
		myInnerHtml("A_KakutyouSel",cooktext + "<br>",0);
		for(i=1;i<=10;i++){
			document.calcForm.Flv.options[i-1] = new Option(i,i);
			document.calcForm.Flv.value=1;}
		for(i=0;i<=5;i++){
			document.calcForm.FStat.options[i] = new Option(Stat_Food[i][1],i);
			document.calcForm.FStat.value=0;}
		for(i=0;i<Cook_Kit_Max;i++){
			document.calcForm.CKit.options[i] = new Option(Cook_Kit[i][1],i);
			document.calcForm.CKit.value=0;}

		return;
	}
	if(wKK == 17){
		var w;
		w = '<div style="float:left;margin-right:10px;padding-top:4px">Number of monsters:</div><div style="float:left"><input type="text" name="A_KakutyouSelNum" value="1" size=4 onChange="KakutyouKansuu()" style="text-align : right"></div><div style="clear:both"></div>';
		myInnerHtml("A_KakutyouSel",w,0);
    return;
	}
	if(wKK == 18){
		healtext = "<table border=0><tr><td>Increase HP Recovery:</td>" + '<td><select name="hp_recovery_lv" onChange="KakutyouKansuu()"></select></td>';
		healtext += "<td>Learning Potion:</td>" + '<td><select name="learning_potion_lv" onChange="KakutyouKansuu()"></select></td></tr>';
		healtext += "<tr><td>Increase SP Recovery:</td>" + '<td><select name="sp_recovery_lv" onChange="KakutyouKansuu()"></select></td>';
		healtext +=  "<td>Rogue Spirit:</td>" + '<td><select name="rogue_spirit" onChange="KakutyouKansuu()"></select></td></tr>';
		healtext +=  "<tr><td>Increase Heal Rate:</td>" + '<td><input type="text" onChange="KakutyouKansuu()" name="heal_rate_bonus" value="0" size=2>%</td>';
		healtext +=  "<td>Fame Top:</td>" + '<td><select name="potion_rank" onChange="KakutyouKansuu()"></select></td></tr>';
		healtext +=  '<tr><td>Item:</td>' + '<td><select name="selected_item" onChange="KakutyouKansuu()"></select></td></tr></table>';
		myInnerHtml("A_KakutyouSel",healtext + "<br>",0);
		
		for (i = 0; i <= 10; ++i)
		{
			document.calcForm.hp_recovery_lv.options[i] = new Option(i,i);
			document.calcForm.sp_recovery_lv.options[i] = new Option(i,i);
			document.calcForm.learning_potion_lv.options[i] = new Option(i,i);
		}

		for (i = 0; i < FAME_TOP.length; ++i)
			document.calcForm.potion_rank.options[i] = new Option(FAME_TOP[i][1],i);
		
		healing_items = ITEM_HEAL;
		if (document.calcForm.vanilla.checked)
			healing_items = ITEM_HEAL.filter(x => x[6]);
		
		for (i= 0; i < healing_items.length; ++i)
			document.calcForm.selected_item.options[i] = new Option(healing_items[i][4],i);

		document.calcForm.potion_rank.value = 0;
		document.calcForm.selected_item.value = 0;
		document.calcForm.sp_recovery_lv.value = 0;
		document.calcForm.hp_recovery_lv.value = 0;
		document.calcForm.learning_potion_lv.value = 0;
		
		document.calcForm.rogue_spirit.options[0] = new Option("No",0);
		document.calcForm.rogue_spirit.options[1] = new Option("Yes",1);
		document.calcForm.rogue_spirit.value=0;
		return;
	}
	if(wKK == 19){
		stealCalcTxt = "";
		stealCalcTxt += "<table border=0>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td width=\"50%\" style=\"vertical-align:baseline\">";
		stealCalcTxt += "<table id=\"tblStealCalcLeft\"  border=0>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td>Steal Level:</td>";
		stealCalcTxt += "<td><select name=\"stealLevel\" onChange=\"KakutyouKansuu()\"></select></td>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td>Player DEX:</td>";
		stealCalcTxt += "<td id=\"playerDexSteal\">"+n_A_DEX+"</td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td>Manually Insert DEX:</td>";
		stealCalcTxt += "<td>";
		stealCalcTxt += "<input type=\"checkbox\" name=\"manuallyInsertDex\" onClick=\"KakutyouKansuu()\"/>";
		stealCalcTxt += " ";
		stealCalcTxt += "<input type=\"number\" name=\"playerDexStealManual\" min=\"0\" max=\"500\" step=\"1\" value=\"0\" onChange=\"KakutyouKansuu()\"/>";
		stealCalcTxt += "</td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td>Monster:</td>";
		stealCalcTxt += "<td><select name=\"monsterStolen\" onChange=\"loadMonsterItemDropListStealCalc();KakutyouKansuu();\"></select></td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td id=\"outputPlayerDexStealCalc\">";
		stealCalcTxt += "</td>";
		stealCalcTxt += "<td rowspan=\"2\" id=\"outputMonsterGifStealCalc\">";
		stealCalcTxt += "</td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td id=\"outputMonsterDexStealCalc\">";
		stealCalcTxt += "</td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "</table>";
		stealCalcTxt += "</td>";
		stealCalcTxt += "<td width=\"50%\" style=\"vertical-align:baseline\">";
		stealCalcTxt += "<span id=\"addRemStealCalc\">";
		stealCalcTxt += "<a onclick=\"addItemSlotStealCalc()\">Add</a>";
		stealCalcTxt += " ";
		stealCalcTxt += "<a onclick=\"delItemSlotStealCalc()\">Remove</a>";	
		stealCalcTxt += "</span>";
		stealCalcTxt += "<table id=\"tblStealCalcRight\" border=0>";
		stealCalcTxt += "<thead>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<th style=\"text-align:left\">Item Slot</th>";
		stealCalcTxt += "<th style=\"text-align:left\">Image</th>";
		stealCalcTxt += "<th style=\"text-align:right\">Drop Rate</th>";
		stealCalcTxt += "<th style=\"text-align:right\">Steal Success</th>";
		stealCalcTxt += "<th style=\"text-align:right\">Individual Success</th>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "</thead>";
		stealCalcTxt += "<tr>";
		stealCalcTxt += "<td>1</td>";
		stealCalcTxt += "<td></td>";
		stealCalcTxt += "<td style=\"text-align:right\"><input type=\"number\" name=\"itemDropRate1\" min=\"0\" max=\"100\" step=\"0.01\" value=\"0.01\" onChange=\"KakutyouKansuu()\"/></td>";
		stealCalcTxt += "<td></td>";
		stealCalcTxt += "<td></td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "</table>";
		stealCalcTxt += "</td>";
		stealCalcTxt += "</tr>";
		stealCalcTxt += "</table>";
		myInnerHtml("A_KakutyouSel",stealCalcTxt,0);
		for(i=1;i<=10;i++) document.calcForm.stealLevel.options[i-1] = new Option(i,i);
		document.calcForm.stealLevel.value=1;
		sortedMonsterArray = MonsterOBJ.concat().sort(function(a,b){return a[1].localeCompare(b[1])});
		for (i = 0; i < sortedMonsterArray.length; ++i) {
			document.calcForm.monsterStolen.options[i] = new Option(prefix + sortedMonsterArray[i][1], sortedMonsterArray[i][0]);
		}
		return;
	}
	if (wKK == 20) // Refine System
	{
		refine_row = -1;
		previous_refine_row = -1;
		
		refine_succeeded = 0;
		refine_timer_id = null;
		
		refine_system_display = "";
		refine_system_display += "<table id='refine_system_header' name='refine_system_header'>";
		refine_system_display += "<tr>";
		refine_system_display += "<td rowspan='3' style='height: 100%;'></td>"; //
		refine_system_display += "<td style='height: 25%;'><select name='equipment_type_select' onChange='update_equipment_list()|reset_refine()|KakutyouKansuu()' style='max-width:100%; white-space:nowrap; width: 100%;'></select></td>";
		refine_system_display += "<td rowspan='2'></td>";
		refine_system_display += "<td style='width: 1%;'/><td style='white-space:nowrap;'>Item cost : </td><td><input type='text' onChange='KakutyouKansuu()' name='refine_item_cost' value='0' style='width: 100%;'></td>";
		refine_system_display += "<td style='width: 1%;'/><td>Smith Job Level: <select name='smith_jlvl_select' onChange='KakutyouKansuu()'></select></td>";
		refine_system_display += "</tr>";
		refine_system_display += "<tr>";
		refine_system_display += "<td style='height: 25%;'><select name='equipment_select' onChange='reset_refine()|KakutyouKansuu()' style='width: 100%;'></select></td>";
		refine_system_display += "<td style='width: 1%;'/><td>Catalyst cost : </td><td><input type='text' onChange='KakutyouKansuu()' name='refine_catalyst_cost' value='0' style='width: 100%;'></td>";
		refine_system_display += "<td style='width: 1%;'/><td><input type='checkbox' name='npc_refine_check' onClick='KakutyouKansuu()'/> NPC Refine Services</td>";
		refine_system_display += "</tr>";
		refine_system_display += "<tr><td></td><td></td><td></td><td></td></tr>";
		refine_system_display += "</table>"
		refine_system_display += "<br><br><table border=0 id='refine_table'>";
		refine_system_display += "<tr><td align=\"center\"></td><td>";
		refine_system_display += "</td><td></td></tr>";
		refine_system_display += "<tr><td><b>Refine Level</b></td><td><b>Refine Rate</b></td><td><b>Cumulated Refine Rate</b></td><td><b>Average Items Required</b></td><td><b>Theoretical Items Cost</b></td>";
		refine_system_display += "<td><b>Average Catalyst Required</b></td><td><b>Theoretical Catalyst Cost</b></td><td><b>Theoretical Total Cost</b></td></tr>";
		for (i = 1; i <= 10; ++i)
			refine_system_display += "<tr><td><b>+" + i + "</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
		refine_system_display += "</table>";
		
		myInnerHtml("A_KakutyouSel", refine_system_display, 0);
		
		equipment_types = ["Armor", "Weapon Lv1", "Weapon Lv2", "Weapon Lv3", "Weapon Lv4"];
		
		for (i = 0; i < equipment_types.length ; ++i)
			document.calcForm.equipment_type_select.options[i] = new Option(equipment_types[i], i);

		for (i = 0; i < 70 ; ++i)
			document.calcForm.smith_jlvl_select.options[i] = new Option(i + 1, i);
		
		refine_header = document.getElementById("refine_system_header");
		document.calcForm.smith_jlvl_select.value = 69;		// Default job level 70
		document.calcForm.equipment_type_select.value = 0;
	
		update_equipment_list();
		
		// Load all images for better fluidity
		set_refine_image(3);
		set_refine_image(2);
		set_refine_image(1);
		set_refine_image();
		
		return;
	}
	if (wKK == 21) // homunculus Analysis
	{
		let homunculus_analysis_display = "";
		homunculus_analysis_display += "<select name='homunculus_select' onChange='on_homunculus_change()' ></select>";
		homunculus_analysis_display += "<select name='homunculus_level_select' onChange='update_homunculus_analysis()' style=''></select>";
		homunculus_analysis_display += "<td><input type='checkbox' name='is_homunculus_evolved_check' onClick='update_homunculus_analysis()'/> Evolved</td>";

		homunculus_analysis_display += "<table border=0 id='homunculus_analysis_table' name='homunculus_analysis_table'>";
		
		for (i in homunculus_stats)
		{
			homunculus_analysis_display += '<tr><td style="width: 10%"><b>' + homunculus_stats[i] + ':</b></td><td style="width: 5%"></td>' + '<td style="width: 10%">0</td>' + '<td style="width: 5%"> ~ </td>' + '<td><input type="number" onChange="update_homunculus_analysis(' + i + ')|KakutyouKansuu()" id="homunculus_' + homunculus_stats[i] + '_input" value="0" style="width: 70px;"></td>';
			homunculus_analysis_display += '<td style="width: 5%"></td><td style="width: 5%"> ~ </td>' + '<td style="width: 10%">0</td>' + '<td style="width: 10%">[ 100% ]</td><td style="width: 10%">[ 0 ]</td><td style="width: 10%">[ 50% ]</td><td style="width: 30%"></td></tr>';
		}
		homunculus_analysis_display += "</table><br>";
		
		homunculus_analysis_display += "<table border=0 id='homunculus_computed_stats_table' name='homunculus_computed_stats_table'>";
		
		for (i in homunculus_computed_stats)
			homunculus_analysis_display += '<tr><td style="width: 10%"><b>' + homunculus_computed_stats[i] + ':</b></td><td style="width: 5%"></td>' + '<td style="width: 85%"></td></tr>';
		homunculus_analysis_display += "</table><br>";
		
		myInnerHtml("A_KakutyouSel", homunculus_analysis_display, 0);
		
		for (const [index, key] of Object.keys(homunculus_db).entries())
			document.calcForm.homunculus_select.options[index] = new Option(key, key);
		for (i = 1; i < 100 ; ++i)
			document.calcForm.homunculus_level_select.options[i - 1] = new Option(i, i);
		
		return;
	}
	myInnerHtml("A_KakutyouSel","",0);
}

function initialize_homunculus_stat_density_matrice(stat)
{
	let homunculus_max_level = 99;
	let homunculus_info = homunculus_db[document.calcForm.homunculus_select.value];
	
	// Retrieve max stat bonus per level up
	let max_stat_growth = homunculus_info["gx" + stat]
	
	// Retrieve min stat bonus to compute the bonus growth repartition
	let min_stat_growth = homunculus_info["gn" + stat]
	let growth_repartition = get_weight_growth_repartition(min_stat_growth, max_stat_growth);
	
	let is_main_stat = ["STR", "AGI", "VIT", "INT", "DEX", "LUK"].findIndex(x => x == stat) > -1;
	if (is_main_stat)
		max_stat_growth = Math.floor(max_stat_growth / 10);
	
	let max_total_growth = homunculus_max_level * max_stat_growth;
	
	density_matrice = Array(max_total_growth + 1).fill().map(()=>Array(homunculus_max_level).fill());
	
	if (is_main_stat)
		update_density_matrice(density_matrice, max_total_growth, homunculus_max_level, growth_repartition);
	
	return density_matrice;
}

function update_density_matrice(density_matrice, x, n, probability_law)
{
    if (x >= 0 || n > 0)
	{
        for (var stat_value = 0; stat_value < density_matrice.length; ++stat_value)
		{
            for (var level = 0; level < density_matrice[0].length; ++level)
			{
                if (level == 0)
				{
                    if (stat_value < probability_law.length)
                        density_matrice[stat_value][level] = probability_law[stat_value];
                    else
                        density_matrice[stat_value][level] = 0;
				}
                else
				{
                    growth_probability = 0
                    for (var stat_bonus = 0; stat_bonus < probability_law.length; ++stat_bonus)
					{
                        if (stat_value >= stat_bonus && level > 0)
                            growth_probability += density_matrice[stat_value - stat_bonus][level - 1] * probability_law[stat_bonus];
					}
                    density_matrice[stat_value][level] = growth_probability;
				}
			}
		}
	}
}

function on_homunculus_change()
{
	stat_density_matrice = {
		"HP"  : initialize_homunculus_stat_density_matrice("HP"),
		"SP"  : initialize_homunculus_stat_density_matrice("SP"),
		"STR" : initialize_homunculus_stat_density_matrice("STR"),
		"AGI" : initialize_homunculus_stat_density_matrice("AGI"),
		"VIT" : initialize_homunculus_stat_density_matrice("VIT"),
		"INT" : initialize_homunculus_stat_density_matrice("INT"),
		"DEX" : initialize_homunculus_stat_density_matrice("DEX"),
		"LUK" : initialize_homunculus_stat_density_matrice("LUK")
	}
	update_homunculus_analysis();
}

function update_homunculus_stat(homunculus_info, homunculus_lv, current_stat, i, is_evolved)
{
	let stat_factor = 1;
	let min_evo_bonus = 0;
	let max_evo_bonus = 0;
	let min_stat_growth = (homunculus_lv > 1) ? homunculus_info["gn" + current_stat] : 0;
	let max_stat_growth = (homunculus_lv > 1) ? homunculus_info["gx" + current_stat] : 0;
	let current_stat_density_matrice = stat_density_matrice[current_stat];
	
	let growth_interval = max_stat_growth - min_stat_growth + 1;
	let growth_repartition = get_weight_growth_repartition(min_stat_growth, max_stat_growth);
	
	let is_main_stat = ["STR", "AGI", "VIT", "INT", "DEX", "LUK"].findIndex(x => x == current_stat) > -1;
	if (is_main_stat)
	{
		stat_factor = 10;
		min_stat_growth -= min_stat_growth % 10;
		max_stat_growth -= max_stat_growth % 10;
	}
	
	// At creation, factor 10 applied on base main stats from db
	let base_stat = homunculus_info["base" + current_stat] * stat_factor;
	
	// No consistency, db is not including that factor 10 for evolution bonus
	if (is_evolved)
	{
		min_evo_bonus = homunculus_info["en" + current_stat] * stat_factor;
		max_evo_bonus = homunculus_info["ex" + current_stat] * stat_factor;
	}
	
	min_stat_value = Math.floor((base_stat + min_stat_growth *(homunculus_lv - 1) + min_evo_bonus) / stat_factor);
	max_stat_value = Math.floor((base_stat + max_stat_growth *(homunculus_lv - 1) + max_evo_bonus) / stat_factor);
	current_stat_input = document.getElementById("homunculus_" + current_stat + "_input");
	current_stat_input.value = Math.max(min_stat_value, Math.min(current_stat_input.value, max_stat_value));
	
	homunculus_analysis_table.rows[i].cells[2].innerHTML = "" + min_stat_value;
	homunculus_analysis_table.rows[i].cells[7].innerHTML = "" + max_stat_value;
	
	// Compute stats % to maximum theoretical stats
	if (min_stat_value != max_stat_value) // To avoid division by zero
		homunculus_analysis_table.rows[i].cells[8].innerHTML = "[ " + ((current_stat_input.value - min_stat_value) / (max_stat_value - min_stat_value) * 100).toFixed(2) + "% ]";
	else
		homunculus_analysis_table.rows[i].cells[8].innerHTML = "[ 100% ]";
	
	// Compute average stat growth per level
	let average_stat_growth_per_lv = (current_stat_input.value - homunculus_info["base" + current_stat]) / (Math.max(1, homunculus_lv - 1));
	homunculus_analysis_table.rows[i].cells[9].innerHTML = "[ " + average_stat_growth_per_lv.toFixed(1) + " ]";
	
	// Compute stats % based on stat growth weight
	if (is_main_stat && homunculus_lv > 1)
	{
		let probability_density_area = compute_probability_density_area(current_stat_density_matrice, current_stat_input.value - homunculus_info["base" + current_stat], homunculus_lv - 2);
		homunculus_analysis_table.rows[i].cells[10].innerHTML = "[ " + (probability_density_area * 100).toFixed(2) + "% ]";
	}
	else
		homunculus_analysis_table.rows[i].cells[10].innerHTML = "[ N/A ]";
}

function compute_probability_density_area(density_matrice, value, iteration)
{
	let probability_density_area = 0
	if (density_matrice.length / 2 > value)
	{
		for (var i = 0; i <= value; ++i)
			probability_density_area += density_matrice[i][iteration];
	}
	else
	{
		for (var i = value + 1; i < density_matrice.length; ++i)
			probability_density_area += density_matrice[i][iteration];
		probability_density_area = 1 - probability_density_area;
	}
	
	return probability_density_area
}

function get_weight_growth_repartition(min, max)
{
	let growth_repartition = []
	let min_index = Math.floor(min / 10);
	growth_repartition[min_index] = 10 - (min % 10 + ((min % 10) ? 1 : 0));
	
	let max_index = Math.floor(max / 10);
	growth_repartition[max_index] = max % 10 + 1;
	
	for (i = 0; i < min_index; ++i)
		growth_repartition[i] = 0;
	
	for (i = min_index + 1; i < max_index; ++i)
		growth_repartition[i] = 10;
	
	return growth_repartition.map(x => x / (max - min));
}

function update_homunculus_computed_stats(homunculus_info, homunculus_lv, current_stat, i)
{
	let stat_value = "";
	let base_aspd = homunculus_info["baseASPD"];
	let str = eval(document.getElementById("homunculus_STR_input").value);
	let agi = eval(document.getElementById("homunculus_AGI_input").value);
	let vit = eval(document.getElementById("homunculus_VIT_input").value);
	let dex = eval(document.getElementById("homunculus_DEX_input").value);
	let luk = eval(document.getElementById("homunculus_LUK_input").value);
	let int_ = eval(document.getElementById("homunculus_INT_input").value);
	
	switch(current_stat)
	{
		case 'ASPD':
			let attack_motion = Math.floor((1000 - 4 * agi - dex) * base_aspd / 1000);
			let raw_aspd = (2000 - attack_motion) / 10;
			stat_value = "" + Math.min(Math.floor(raw_aspd), 190);
			break;
		case 'ATK':
			let base_attack = str + Math.floor(str / 10) * Math.floor(str / 10);
			stat_value = "" + base_attack + " + " + (str + homunculus_lv);
			break;
		case 'MATK':
			stat_value = "" + (int_ + Math.floor(int_ / 7) * Math.floor(int_ / 7)) + " ~ " + (int_ + Math.floor(int_ / 5) * Math.floor(int_ / 5));
			break;
		case 'DEF':
			stat_value = "" + (Math.min(Math.floor(homunculus_lv / 10) + Math.floor(vit / 5), 99)) + " + " + vit;
			break;
		case 'MDEF':
			stat_value = "" + (Math.min(Math.floor(homunculus_lv / 10) + Math.floor(int_ / 5), 99)) + " + " + (int_ + Math.floor(vit / 2));
			break;
		case 'FLEE':
			stat_value = "" + (homunculus_lv + agi)
			break;
		case 'HIT':
			stat_value = "" + (homunculus_lv + dex)
			break;
		case 'CRIT':
			stat_value = "" + (1 + Math.floor(luk / 3));
			break;
		default:
			break;
	}
	homunculus_computed_stats_table.rows[i].cells[2].innerHTML = stat_value;
}

function update_homunculus_analysis(stat_index = -1)
{
	let homunculus_info = homunculus_db[document.calcForm.homunculus_select.value];
	let homunculus_lv = eval(document.calcForm.homunculus_level_select.value);
	let is_evolved = document.calcForm.is_homunculus_evolved_check.checked;
	
	if (stat_index < 0)
	{
		for (i in homunculus_stats)
			update_homunculus_stat(homunculus_info, homunculus_lv, homunculus_stats[i], i, is_evolved); 
	}
	else
		update_homunculus_stat(homunculus_info, homunculus_lv, homunculus_stats[stat_index], stat_index, is_evolved);

	for (i in homunculus_computed_stats)
		update_homunculus_computed_stats(homunculus_info, homunculus_lv, homunculus_computed_stats[i], i);
}

function update_equipment_list()
{
	equipment_type = document.calcForm.equipment_type_select.value;
	
	filtered_equipment_list = ItemOBJ.filter(x => (x[4] == equipment_type) && (x[1] != 100) && (equipment_type == 0 ? x[1] == 50 || (x[1] >= 60 && x[1] < 64) : true) && (x[8].slice(0,1) != '(')).concat().sort(function(a,b){return a[8].localeCompare(b[8])});
	
	document.calcForm.equipment_select.innerHTML = "";
	for (i = 0; i < filtered_equipment_list.length ; ++i)
			document.calcForm.equipment_select.options[i] = new Option(filtered_equipment_list[i][8], ItemID[filtered_equipment_list[i][0]][2]);
}

function simulate_refine()
{
	set_refine_image(3);
	// Manage previous refine failure
	if (!refine_succeeded && previous_refine_row > -1)
		reset_refine();
	
	previous_refine_row = refine_row;
	refine_row = (refine_row + 1) % 10;
	
	refine_table = document.getElementById("refine_table");
	refine_success_rate = refine_table.rows[refine_row + 2].cells[1].innerText.match(/\d+/);
	
	refine_succeeded = Math.floor(Math.random() * 101) <= refine_success_rate;
	
	// Manage current refine
	if (previous_refine_row > -1)
		refine_table.rows[previous_refine_row + 2].innerHTML = refine_table.rows[previous_refine_row + 2].innerHTML.replaceAll("<td bgcolor=\"#DDDDFF\">", "<td>");
	if (refine_row > -1 && refine_succeeded)
	{
		refine_table.rows[refine_row + 2].innerHTML = refine_table.rows[refine_row + 2].innerHTML.replaceAll("<td>", "<td bgcolor='#DDDDFF'>");
		clearTimeout(refine_timer_id);
		refine_timer_id = setTimeout(set_refine_image, 100, 1);
	}
	else
	{
		refine_table.rows[refine_row + 1].innerHTML = refine_table.rows[refine_row + 1].innerHTML.replaceAll("<td>", "<td bgcolor='#FFDDDD'>");
		clearTimeout(refine_timer_id);
		refine_timer_id = setTimeout(set_refine_image, 100, 2);
		refine_row = -1
	}
}

function reset_refine()
{
	refine_table = document.getElementById("refine_table");
	refine_table.rows[0].cells[2].innerHTML =  "";
	set_refine_image();
	
	refine_table.rows[previous_refine_row + 2].innerHTML = refine_table.rows[previous_refine_row + 2].innerHTML.replaceAll("<td bgcolor=\"#FFDDDD\">", "<td>");
	previous_refine_row = -1;
}

function set_refine_image(image_id = 0)
{
	switch (image_id)
	{
		case 1:
			refine_header.rows[0].cells[0].innerHTML =  "<img src=\"./images/refine_succeeded.png\" alt=\"no picture available =(\" onclick=\"simulate_refine()\" style='cursor:pointer;margin-left:10%'>";
			clearTimeout(refine_timer_id);
			refine_timer_id = setTimeout(set_refine_image, 300);
			break;
		case 2:
			refine_header.rows[0].cells[0].innerHTML =  "<img src=\"./images/refine_failed.png\" alt=\"no picture available =(\" onclick=\"simulate_refine()\" style='cursor:pointer;margin-left:10%'>";
			clearTimeout(refine_timer_id);
			refine_timer_id = setTimeout(set_refine_image, 300);
			break;
		case 3:
			refine_header.rows[0].cells[0].innerHTML =  "<img src=\"./images/refine_prepare.png\"  alt=\"no picture available =(\" onclick=\"simulate_refine()\" style='cursor:pointer;margin-left:10%'>";
			break;
		case 0:
		default:
			refine_header.rows[0].cells[0].innerHTML =  "<img src=\"./images/refine_idle.png\" alt=\"no picture available =(\" onclick=\"simulate_refine()\" style='cursor:pointer;margin-left:10%'>";
	}
}

function loadMonsterItemDropListStealCalc() {
	var tbl = document.getElementById("tblStealCalcRight");
	while (tbl.rows.length > 1) {
		tbl.deleteRow(-1);
	}
	var monsterStolen = MonsterOBJ[eval(document.calcForm.monsterStolen.value)];
	if (monsterStolen[24]) {
		document.getElementById("addRemStealCalc").style = "display:none";
		for (i = 0; i < 10; ++i) {
			var row = tbl.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			cell3.style = "text-align:right";
			cell4.style = "text-align:right";
			cell5.style = "text-align:right";
			var dropPercentage = monsterStolen[25 + i*2];
			var dropItemId = monsterStolen[24 + i*2];
			if (dropItemId == 0) {
				continue;
			}
			cell1.innerHTML = (i+1);
			if (i == 9) {
				cell1.innerHTML = "Card";
			}
			cell2.innerHTML += " <a href=\"https://talontales.com/panel/?module=item&action=view&id="+dropItemId+"/\" target=\"_blank\"><img src=\"https://talontales.com/panel/data/items/icons/"+dropItemId+".png\" alt=\"no picture available =(\"></a>";
			cell3.innerHTML += (+dropPercentage).toFixed(2) + "%";
		}
	} else {
		document.getElementById("addRemStealCalc").style = "";
		addItemSlotStealCalc();
	}
}

function addItemSlotStealCalc() {
	var tbl = document.getElementById("tblStealCalcRight");
	if (tbl.rows.length == 8) return;
	var row = tbl.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell3.style = "text-align:right";
	cell4.style = "text-align:right";
	cell5.style = "text-align:right";
	cell1.innerHTML = (tbl.rows.length-1);
	cell3.innerHTML = "<input type=\"number\" name=\"itemDropRate" + (tbl.rows.length-1) + "\" min=\"0.01\" max=\"100\" step=\"0.01\" value=\"0.01\" onChange=\"KakutyouKansuu()\"/>";
	StAllCalc();
}

function delItemSlotStealCalc() {
	var tbl = document.getElementById("tblStealCalcRight");
	if (tbl.rows.length == 2) return;
	tbl.deleteRow(-1);
	StAllCalc();
}

function SetCardShort(){
with(document.calcForm){
	w = eval(A_cardshort.value);
if(w > 0) {
	if(CardShort[w][1] < 10000){
		A_weapon1_card1.value = CardShort[w][1];
		A_weapon1_card2.value = CardShort[w][2];
		A_weapon1_card3.value = CardShort[w][3];
		A_weapon1_card4.value = CardShort[w][4];

		if(w == 9 || w == 10){
			w = MonsterOBJ[eval(B_Enemy.value)][3];

			if(10 <= w && w <= 14)
				A_weapon1_card1.value = 204;
			if((20 <= w && w <= 24) || (80 <= w && w <= 94))
				A_weapon1_card1.value = 203;
			if(30 <= w && w <= 34)
				A_weapon1_card1.value = 201;
			if(40 <= w && w <= 44)
				A_weapon1_card1.value = 202;
		}
	}else if(CardShort[w][0] != "Remove All Cards") { //Job Card Set
		if(CardShort[w][2] != 0)
			A_weapon1_card1.value = CardShort[w][2];
		if(CardShort[w][3] != 0)
			A_head1_card.value = CardShort[w][3];
		if(CardShort[w][4] != 0)
			A_left_card.value = CardShort[w][4];
		if(CardShort[w][5] != 0)
			A_body_card.value = CardShort[w][5];
		if(CardShort[w][6] != 0)
			A_shoulder_card.value = CardShort[w][6];
		if(CardShort[w][7] != 0)
			A_shoes_card.value = CardShort[w][7];
		if(CardShort[w][8] != 0)
			A_acces1_card.value = CardShort[w][8];
		if(CardShort[w][9] != 0)
			A_acces2_card.value = CardShort[w][9];
		if(CardShort[w][10] != 0)
			A_head2_card.value = CardShort[w][10];
	} else { //remove all cards
		A_weapon1_card1.value = 0;
		A_weapon1_card2.value = 0;
		A_weapon1_card3.value = 0;
		A_weapon1_card4.value = 0;

		if(typeof A_weapon2_card1 != "undefined") {
			A_weapon2_card1.value = 0;
			A_weapon2_card2.value = 0;
			A_weapon2_card3.value = 0;
			A_weapon2_card4.value = 0;
		}

		A_head1_card.value = 0;
		A_head2_card.value = 0;
		A_left_card.value = 0;
		A_body_card.value = 0;
		A_shoulder_card.value = 0;
		A_shoes_card.value = 0;
		A_acces1_card.value = 0;
		A_acces2_card.value = 0;
	}
	ActiveSkillSetPlus();
}
}}

function SetCardShortLeft(){
with(document.calcForm){
	w = eval(A_cardshortLeft.value);

	A_weapon2_card1.value = CardShort[w][1];
	A_weapon2_card2.value = CardShort[w][2];
	A_weapon2_card3.value = CardShort[w][3];
	A_weapon2_card4.value = CardShort[w][4];


	if(w == 9 || w == 10){
		w = MonsterOBJ[eval(B_Enemy.value)][3];

		if(10 <= w && w <= 14)
			A_weapon2_card1.value = 204;
		if((20 <= w && w <= 24) || (80 <= w && w <= 94))
			A_weapon2_card1.value = 203;
		if(30 <= w && w <= 34)
			A_weapon2_card1.value = 201;
		if(40 <= w && w <= 44)
			A_weapon2_card1.value = 202;
	}
}}

wESx = new Array();
for(i=0;i<=EnemyNum;i++)
	wESx[i]=new Array();

function manage_boss_property_sort(is_boss_check)
{
	boss_filter = eval(document.calcForm.boss_filter.checked);
	non_boss_filter = eval(document.calcForm.non_boss_filter.checked);
	
	if (!non_boss_filter && !boss_filter)
	{
		if (is_boss_check)
			document.calcForm.boss_filter.checked = true;
		else
			document.calcForm.non_boss_filter.checked = true;
	}
}

function sort_monsters_db()
{
	sort_type = eval(document.calcForm.ENEMY_SORT.value);
	boss_filter = eval(document.calcForm.boss_filter.checked);
	non_boss_filter = eval(document.calcForm.non_boss_filter.checked);
	selected_region = eval(document.calcForm.ENEMY_SORT2.value);
	
	if (selected_region)
		monsters_db = MonsterOBJ.filter(x => MonMap[selected_region].includes(x[0]));
	else
		monsters_db = MonsterOBJ;
	
	monsters_db = monsters_db.filter(x => (boss_filter ? x[19] == 1 : 0) || (non_boss_filter ? x[19] != 1 : 0));
	
	if (!sort_type) // Alpha-numerical sort [1]
		sorted_monsters_db = monsters_db.concat().sort(function(a,b){return a[1].localeCompare(b[1])});
	else if (8 == sort_type || 10 == sort_type)
		sorted_monsters_db = monsters_db.concat().sort(function(a,b){return (a[5] + a[sort_type]) - (b[5] + b[sort_type])});
	else
		sorted_monsters_db = monsters_db.concat().sort(function(a,b){return a[sort_type] - b[sort_type]});

	prefix = "";
	document.calcForm.B_Enemy.innerHTML = null;

	for (i = 0; i < sorted_monsters_db.length; ++i)
	{	
		if (3 == sort_type) // Attribute [3]
			prefix = "[" + ZokuseiOBJ2[Math.floor(sorted_monsters_db[i][sort_type] /10)] + sorted_monsters_db[i][sort_type] % 10 +"] "
		if (2 == sort_type) // Race Sort [2]
			prefix = "[" + SyuzokuOBJ[sorted_monsters_db[i][sort_type]] + "] ";
		else if (8 == sort_type) // 100% Hit - MonsterOBJ[i][21] = 20 + MonsterOBJ[i][5] + MonsterOBJ[i][8];
			prefix = "(" + (20 + sorted_monsters_db[i][5] + sorted_monsters_db[i][8]) + ") ";
		else if (10 == sort_type) // 95% Flee - MonsterOBJ[i][22] = 75 + MonsterOBJ[i][5] + MonsterOBJ[i][10];
			prefix = "(" + (75 + sorted_monsters_db[i][5] + sorted_monsters_db[i][10]) + ") ";

		document.calcForm.B_Enemy.options[i] = new Option(prefix + sorted_monsters_db[i][1], sorted_monsters_db[i][0]);
	}
}

var nMANUKU = [524,527,528,530,531,534,541];
function MANUKU_MONSTER(){
	for(var i=0;i < nMANUKU.length;i++){
		if(n_B[0] == nMANUKU[i])
			return 1;
	}
	return 0;
}

var nSUPURE = [525,526,529,532,533,537];
function SUPURE_MONSTER(){
	for(var i=0;i < nSUPURE.length;i++){
		if(n_B[0] == nSUPURE[i])
			return 1;
	}
	return 0;
}

// Juperos Ruins, Apocalypse#9, Venatu#384-388, Dimik#389-393, Gate Controller#394, Vesper#395
function IsAJuperosRuinsMonster(){
	return (n_B[0] == 9 || (n_B[0] >= 384 && n_B[0] <= 395));
}

// Kiel Dungeon (Alice excluded), Constant#430, Aliza#431, Alicel#432, Aliot#433, Kiel#434, Kiel D-01#435
function IsAKielDungeonMonster(){
	return (n_B[0] >= 430 && n_B[0] <= 435)
}

// Biolab Dungeon
function IsABiolabMonster() {
	return (MonMap[10].findIndex( (x) => x == n_B[0] ) > -1);
}

n_NtoS =["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
n_NtoS2 =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
function NtoS(n,keta){
	var strX = "";
	if(keta == 3){
		strX += n_NtoS[Math.floor(n / 100)];
		var w = n % 100;
		if(w >= 10)
			strX += w;
		else
			strX += "0" + w;
	}else if(keta == 2){
		strX += n_NtoS[Math.floor(n / 10)];
		strX += n % 10;
	}else{
		strX += n_NtoS[n];
	}
	return strX;
}

function StoN(n){
	n += "";
	for(var i=0;i<=61;i++)
		if(n == n_NtoS[i])
			return i;
}

SaveStr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14, 15,16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159]; // Add to 159
SaveStr1 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,  3, 1,  3,  3,  3,  3,  3, 1,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

function CopyToClipboard() {
  url = document.calcForm.URL_TEXT;

  url.select();
  url.setSelectionRange(0, 99999);

  document.execCommand("copy");
}

function SaveCookie(){
with(document.calcForm){
	
	if (confirm("Saving will erase existing data, do you want to continue?"))
	{
		SaveData = new Array();

		for(i=0;i<=160;i++){
			SaveData[i]=0;
		}

		SaveData[0] = eval(A_JOB.value);
		SaveData[1] = eval(A_BaseLV.value);
		SaveData[2] = eval(A_JobLV.value);
		SaveData[3] = eval(A_STR.value);
		SaveData[4] = eval(A_AGI.value);
		SaveData[5] = eval(A_VIT.value);
		SaveData[6] = eval(A_DEX.value);
		SaveData[7] = eval(A_INT.value);
		SaveData[8] = eval(A_LUK.value);

		SaveData[9] = eval(A_HSE.value);

		SaveData[10] = eval(A_WeaponType.value);
		if(n_Nitou)
			SaveData[11] = eval(A_Weapon2Type.value);

		if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && n_A_WeaponType!=0))
			SaveData[12] = eval(A_Arrow.value);

		SaveData[13] = eval(A_SpeedPOT.value);
		SaveData[14] = 4;
		SaveData[15] = eval(A_weapon1.value);
		SaveData[16] = eval(A_Weapon_ATKplus.value);
		SaveData[17] = eval(A_weapon1_card1.value);
		SaveData[18] = eval(A_weapon1_card2.value);
		SaveData[19] = eval(A_weapon1_card3.value);
		SaveData[20] = eval(A_weapon1_card4.value);
		if(n_Nitou){
			SaveData[21] = eval(A_weapon2.value);
			SaveData[22] = eval(A_Weapon2_ATKplus.value);
			SaveData[23] = eval(A_weapon2_card1.value);
			SaveData[24] = eval(A_weapon2_card2.value);
			SaveData[25] = eval(A_weapon2_card3.value);
			SaveData[26] = eval(A_weapon2_card4.value);
		}else{
			SaveData[21] = 0;
			SaveData[22] = 0;
			SaveData[23] = 0;
			SaveData[24] = 0;
			SaveData[25] = 0;
			SaveData[26] = 0;
		}
		SaveData[27] = eval(A_head1.value);
		SaveData[28] = eval(A_head1_card.value);
		SaveData[29] = eval(A_head2.value);
		SaveData[30] = eval(A_head2_card.value);
		SaveData[31] = eval(A_head3.value);
		SaveData[32] = eval(A_HSE_HEAD1.value);
		SaveData[33] = eval(A_left.value);
		SaveData[34] = eval(A_left_card.value);
		SaveData[35] = eval(A_body.value);
		SaveData[36] = eval(A_body_card.value);
		SaveData[37] = eval(A_shoulder.value);
		SaveData[38] = eval(A_shoulder_card.value);
		SaveData[39] = eval(A_shoes.value);
		SaveData[40] = eval(A_shoes_card.value);
		SaveData[41] = eval(A_acces1.value);
		SaveData[42] = eval(A_acces1_card.value);
		SaveData[43] = eval(A_acces2.value);
		SaveData[44] = eval(A_acces2_card.value);

		n_A_JobSet();
		w = n_A_JOB;


		var ch = 0;
		for(var i=0;i<=14 && ch==0;i++){
			if(JobSkillPassOBJ[w][i]!=999){
				var wOBJ = document.getElementById("A_skill"+i);
				SaveData[45+i] = eval(wOBJ.value);
			}else
				ch = 1;
		}

		SaveData[63] = eval(A_youshi.checked);
		if(SaveData[63] == true)
			SaveData[63] = 1;
		else if(SaveData[63] == false)
			SaveData[63] = 0;
		SaveData[64] = eval(A_Weapon_zokusei.value);

		for(i=0;i<=12;i++){
			SaveData[65+i] = n_A_PassSkill2[i];
			if(SaveData[65+i] == true)
				SaveData[65+i] = 1;
			else if(SaveData[65+i] == false)
				SaveData[65+i] = 0;
		}
		SaveData[78] = 0;
		SaveData[79] = 0;
		SaveData[80] = 0;
		SaveData[81] = 0;
		SaveData[82] = 0;
		SaveData[83] = 0;
		SaveData[84] = eval(A_HEAD_DEF_PLUS.value);
		SaveData[85] = eval(A_BODY_DEF_PLUS.value);
		SaveData[86] = eval(A_LEFT_DEF_PLUS.value);
		SaveData[87] = eval(A_SHOULDER_DEF_PLUS.value);
		SaveData[88] = eval(A_SHOES_DEF_PLUS.value);
		//custom Talon Tales Kris Enchantment Save Cookie
		if(A_weapon1.value == 1472){
			SaveData[89] = eval(A_KE11.value);
			SaveData[90] = eval(A_KE12.value);
		}else{
			SaveData[89] = 0;
			SaveData[90] = 0;
		}
		if (typeof(A_weapon2) != "undefined"){
			if(A_weapon2.value == 1472){
				SaveData[91] = eval(A_KE21.value);
				SaveData[92] = eval(A_KE22.value);
			}else{
				SaveData[91] = 0;
				SaveData[92] = 0;
			}
		}else{
			SaveData[91] = 0;
			SaveData[92] = 0;
		}
		//custom Talon Tales SQI interface Save Cookie
		x_sqibonus=0;
		for(i=0;i<=3 && SQI_Bonus_Effect[i]==0;i++);
		if(i!=4)
			x_sqibonus = 1;
		if (x_sqibonus){
			SaveData[93] = SQI_Bonus_Effect[0];
			SaveData[94] = SQI_Bonus_Effect[1];
			SaveData[95] = SQI_Bonus_Effect[2];
			SaveData[96] = SQI_Bonus_Effect[3];
		}else{
			SaveData[93] = 0;
			SaveData[94] = 0;
			SaveData[95] = 0;
			SaveData[96] = 0;
		}

		//[Custom Talon Tales 2018-06-14 - Save Cookie for Malangdo] [Kato]
		SaveData[97] = ((A_ME11.value) ? eval(A_ME11.value) : 0);
		SaveData[98] = ((A_ME12.value) ? eval(A_ME12.value) : 0);

		if (typeof(A_weapon2) != "undefined"){
				SaveData[99] = ((A_ME21.value) ? eval(A_ME21.value) : 0);
				SaveData[100] = ((A_ME22.value) ? eval(A_ME22.value) : 0);
		}else{
				SaveData[99] = 0;
				SaveData[100] = 0;
		}

		//[Custom Talon Tales 2018-07-10 - Save Cookie for Biolab Weapon] [NattWara]
		SaveData[101] = ((A_BE11.value) ? eval(A_BE11.value) : 0);
		SaveData[102] = ((A_BE12.value) ? eval(A_BE12.value) : 0);

		if (typeof(A_weapon2) != "undefined"){
				SaveData[103] = ((A_BE21.value) ? eval(A_BE21.value) : 0);
				SaveData[104] = ((A_BE22.value) ? eval(A_BE22.value) : 0);
		}else{
				SaveData[103] = 0;
				SaveData[104] = 0;
		}

		//[Custom Talon Tales 2018-07-13 - Save Cookie for Eden Weapon] [NattWara]
		SaveData[105] = ((A_EE11.value) ? eval(A_EE11.value) : 0);
		SaveData[106] = ((A_EE12.value) ? eval(A_EE12.value) : 0);
		SaveData[107] = ((A_EE13.value) ? eval(A_EE13.value) : 0);

		if (typeof(A_weapon2) != "undefined"){
				SaveData[108] = ((A_EE21.value) ? eval(A_EE21.value) : 0);
				SaveData[109] = ((A_EE22.value) ? eval(A_EE22.value) : 0);
				SaveData[110] = ((A_EE23.value) ? eval(A_EE23.value) : 0);
		}else{
				SaveData[108] = 0;
				SaveData[109] = 0;
				SaveData[110] = 0;
		}

		//[Custom Talon Tales 2018-07-13 - Save Cookie for Biolab Armor] [NattWara]
		SaveData[111] = ((A_BEH1.value) ? eval(A_BEH1.value) : 0);
		SaveData[112] = ((A_BEH2.value) ? eval(A_BEH2.value) : 0);
		SaveData[113] = ((A_BEA1.value) ? eval(A_BEA1.value) : 0);
		SaveData[114] = ((A_BEA2.value) ? eval(A_BEA2.value) : 0);
		SaveData[115] = ((A_BES1.value) ? eval(A_BES1.value) : 0);
		SaveData[116] = ((A_BES2.value) ? eval(A_BES2.value) : 0);
		SaveData[117] = ((A_BEG1.value) ? eval(A_BEG1.value) : 0);
		SaveData[118] = ((A_BEG2.value) ? eval(A_BEG2.value) : 0);
		SaveData[119] = ((A_BEAC11.value) ? eval(A_BEAC11.value) : 0);
		SaveData[120] = ((A_BEAC12.value) ? eval(A_BEAC12.value) : 0);
		SaveData[121] = ((A_BEAC21.value) ? eval(A_BEAC21.value) : 0);
		SaveData[122] = ((A_BEAC22.value) ? eval(A_BEAC22.value) : 0);

		//[Custom Talon Tales 2018-07-13 - Save Cookie for Eden Armor] [NattWara]
		SaveData[123] = ((A_EEH.value) ? eval(A_EEH.value) : 0);
		SaveData[124] = ((A_EEA1.value) ? eval(A_EEA1.value) : 0);
		SaveData[125] = ((A_EEA2.value) ? eval(A_EEA2.value) : 0);
		SaveData[126] = ((A_EEG1.value) ? eval(A_EEG1.value) : 0);
		SaveData[127] = ((A_EEG2.value) ? eval(A_EEG2.value) : 0);
		SaveData[128] = ((A_EEF1.value) ? eval(A_EEF1.value) : 0);
		SaveData[129] = ((A_EEF2.value) ? eval(A_EEF2.value) : 0);

		//[Custom Talon Tales 2018-07-13 - Save Cookie for El Dicaste] [NattWara]
		SaveData[130] = ((A_EDG1.value) ? eval(A_EDG1.value) : 0);
		SaveData[131] = ((A_EDG2.value) ? eval(A_EDG2.value) : 0);
		SaveData[132] = ((A_EDG3.value) ? eval(A_EDG3.value) : 0);
		SaveData[133] = ((A_EDF1.value) ? eval(A_EDF1.value) : 0);
		SaveData[134] = ((A_EDF2.value) ? eval(A_EDF2.value) : 0);
		SaveData[135] = ((A_EDF3.value) ? eval(A_EDF3.value) : 0);
		SaveData[136] = ((A_EDAC11.value) ? eval(A_EDAC11.value) : 0);
		SaveData[137] = ((A_EDAC12.value) ? eval(A_EDAC12.value) : 0);
		SaveData[138] = ((A_EDAC13.value) ? eval(A_EDAC13.value) : 0);
		SaveData[139] = ((A_EDAC21.value) ? eval(A_EDAC21.value) : 0);
		SaveData[140] = ((A_EDAC22.value) ? eval(A_EDAC22.value) : 0);
		SaveData[141] = ((A_EDAC23.value) ? eval(A_EDAC23.value) : 0);
		SaveData[142] = ((A_EDLOED11.value) ? eval(A_EDLOED11.value) : 0);
		SaveData[143] = ((A_EDLOED12.value) ? eval(A_EDLOED12.value) : 0);
		SaveData[144] = ((A_EDLOED13.value) ? eval(A_EDLOED13.value) : 0);
		SaveData[145] = ((A_EDLOED21.value) ? eval(A_EDLOED21.value) : 0);
		SaveData[146] = ((A_EDLOED22.value) ? eval(A_EDLOED22.value) : 0);
		SaveData[147] = ((A_EDLOED23.value) ? eval(A_EDLOED23.value) : 0);

		//[Custom Talon Tales 2018-07-13 - Save Cookie for Mora] [NattWara]
		SaveData[148] = ((A_MORAEA1.value) ? eval(A_MORAEA1.value) : 0);
		SaveData[149] = ((A_MORAEA2.value) ? eval(A_MORAEA2.value) : 0);
		SaveData[150] = ((A_MORAEA3.value) ? eval(A_MORAEA3.value) : 0);
		SaveData[151] = ((A_MORAEG1.value) ? eval(A_MORAEG1.value) : 0);
		SaveData[152] = ((A_MORAEG2.value) ? eval(A_MORAEG2.value) : 0);
		SaveData[153] = ((A_MORAEG3.value) ? eval(A_MORAEG3.value) : 0);
		SaveData[154] = ((A_MORAEAC11.value) ? eval(A_MORAEAC11.value) : 0);
		SaveData[155] = ((A_MORAEAC12.value) ? eval(A_MORAEAC12.value) : 0);
		SaveData[156] = ((A_MORAEAC13.value) ? eval(A_MORAEAC13.value) : 0);
		SaveData[157] = ((A_MORAEAC21.value) ? eval(A_MORAEAC21.value) : 0);
		SaveData[158] = ((A_MORAEAC22.value) ? eval(A_MORAEAC22.value) : 0);
		SaveData[159] = ((A_MORAEAC23.value) ? eval(A_MORAEAC23.value) : 0);
		
		// Save build name in serialization
		SaveData[160] = (document.calcForm.A_SlotName.value != document.calcForm.A_SlotName.defaultValue) ? document.calcForm.A_SlotName.value : "undefined";

		//wak1="";
		//for(i=0;i<=96;i++)
		//	wak1+=i+": "+SaveData[i]+"\n";
		for(i=0;i<=159;i++)
			SaveData[i] = NtoS(SaveData[i],SaveStr1[i]);
		//for(i=0;i<=96;i++)
		//	wak1+=i+": "+SaveData[i]+"\n";
		//alert(wak1);

		cookieNum = A_SaveSlot.value;

		wDay = 99000;

		wCookie = new Date();
		wCookie.setTime(wCookie.getTime()+(wDay*1000*60*60*24));
		expDay = wCookie.toGMTString();

		wStr = "" +SaveData[0];

		for(i=1;i<=160;i++){
			wStr += ""+SaveData[i];
		}

		//Compress String - [NattWara] - 2018-07-15
		var comp_wStr = Base64.toBase64(RawDeflate.deflate(wStr));
		comp_wStr = comp_wStr.replace(/=/g, '');

		if (comp_wStr.length < wStr.length-1) {
			wStr = '_' + comp_wStr;
		}

		document.cookie = cookieNum +"="+ wStr +"; expires="+ expDay;

		bkcN = cookieNum;
		LoadCookie3();
		A_SaveSlot.value = bkcN;
	}
}}

function LoadCookie(){
with(document.calcForm){
	SaveData = new Array();
	cookieNum = A_SaveSlot.value;
	SaveData = document.cookie.split("; ");
	wStr = "";
	//clear baby job status before load - [Loa] - 2018-06-22
	if(A_youshi.checked){
		A_youshi.checked = false;
		BabyJobs();
	}
	//clear vanilla modes and refill items before load - [Loa] - 2018-07-09
	if(vanilla.checked){
		vanilla.checked = false;
		VanillaWep();
		VanillaArmor();
		VanillaCard();
	}

	for(i=0;SaveData[i];i++){
		if (SaveData[i].substr(0,6) == cookieNum +"="){
			wStr = SaveData[i].substr(6,SaveData[i].length);
			break;
		}
	}

	//Decompress String - [NattWara] - 2018-07-15
	if (wStr.substr(0,1) == '_'){
		wStr = wStr.replace(/_/g, '');
		wStr += '='.repeat(4 - wStr.length % 4);
		wStr = Base64.btou(RawDeflate.inflate(Base64.fromBase64(wStr)));
	}

	for(i=0;i<=160;i++){
		SaveData[i] = 0;
	}

	j=0;
	for(i=0;i<=159;i++){
		if(SaveStr1[i] == 1){
			SaveData[i] = wStr.substr(j,1);
			j++;
		}else if(SaveStr1[i] == 2){
			SaveData[i] = wStr.substr(j,2)
			j+=2;
		}else{
			SaveData[i] = wStr.substr(j,3);
			j+=3;
		}
	}
	SaveData[160] = wStr.substr(j, wStr.length);

	for(i=0;i<=159;i++){
		if(SaveStr1[i] == 1)
			SaveData[i] = StoN(SaveData[i]);
		if(SaveStr1[i] == 2)
			SaveData[i] = StoN(SaveData[i].substr(0,1)) + SaveData[i].substr(1,1);
		if(SaveStr1[i] == 3)
			SaveData[i] = StoN(SaveData[i].substr(0,1)) + SaveData[i].substr(1,2);
	}

	for(i=0;i<=159;i++){
		if(SaveStr1[i] == 3 && SaveData[i].substr(0,2) == "00")
			SaveData[i] = SaveData[i].substr(2,1);
		else if(SaveStr1[i] == 3 && SaveData[i].substr(0,1) == "0")
			SaveData[i] = SaveData[i].substr(1,2);
		else if(SaveStr1[i] == 2 && SaveData[i].substr(0,1) == "0")
			SaveData[i] = SaveData[i].substr(1,1);
	}
	if(SaveData[88] == "u" || SaveData[88] == "und")
		SaveData[88] = 0;

	//custom Talon Tales
	//to make sure cookies created before kris/sqi save feature can be loaded
	for(i=89;i<=96;i++){
		if (typeof(SaveData[i]) == "undefined"){
			SaveData[i] = 0;
		}
	}

	//  97-100 Malangdo
	// 101-104 Biolab Weapon
	// 105-110 Eden Weapon
	// 111-122 Biolab Armor
	// 123-129 Eden Armor
	// 130-147 El Dicaste
	// 148-159 Mora
	for(i=97;i<=159;i++){
		if (typeof(SaveData[i]) == "undefined"){
			SaveData[i] = 0;
		}
	}

	for(i=0;i<=159;i++)
			SaveData[i] = eval(SaveData[i]);

	if(eval(SaveData[0]) == 20 && eval(SaveData[54]) == 1)
		SuperNoviceFullWeaponCHECK = 1;
	else
		SuperNoviceFullWeaponCHECK = 0;

	A_JOB.value = SaveData[0];
	ClickJob(SaveData[0]);
	A_BaseLV.value = SaveData[1];
	A_JobLV.value = SaveData[2];
	A_STR.value = SaveData[3];
	A_AGI.value = SaveData[4];
	A_VIT.value = SaveData[5];
	A_DEX.value = SaveData[6];
	A_INT.value = SaveData[7];
	A_LUK.value = SaveData[8];

	A_HSE.value = SaveData[9];

	A_WeaponType.value = SaveData[10];
	ClickWeaponType(SaveData[10]);
	if((SaveData[0] == 8 || SaveData[0] == 22) && SaveData[10] != 11){
		A_Weapon2Type.value = SaveData[11];
		ClickWeaponType2(SaveData[11]);
	}
	n_A_JobSet();

	if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && SaveData[10]!=0))
		A_Arrow.value = SaveData[12];

	A_SpeedPOT.value = SaveData[13];
	A_weapon1.value = SaveData[15];
	A_Weapon_ATKplus.value = SaveData[16];
	A_weapon1_card1.value = SaveData[17];
	A_weapon1_card2.value = SaveData[18];
	A_weapon1_card3.value = SaveData[19];
	A_weapon1_card4.value = SaveData[20];
	if(n_Nitou){
		A_weapon2.value = SaveData[21];
		A_Weapon2_ATKplus.value = SaveData[22];
		A_weapon2_card1.value = SaveData[23];
		A_weapon2_card2.value = SaveData[24];
		A_weapon2_card3.value = SaveData[25];
		A_weapon2_card4.value = SaveData[26];
	}

	if(SaveData[14] < 4){
		if(SaveData[28] == 299)SaveData[28] = 298;
		if(SaveData[28] == 400)SaveData[28] = 298;
		if(SaveData[30] == 299)SaveData[30] = 298;
		if(SaveData[30] == 400)SaveData[30] = 298;
		if(SaveData[34] == 311)SaveData[34] = 310;
		if(SaveData[36] == 226)SaveData[36] = 225;
		if(SaveData[38] == 272)SaveData[38] = 271;
		if(SaveData[40] == 305)SaveData[40] = 304;
		if(SaveData[40] == 363)SaveData[40] = 362;
	}

	A_head1.value = SaveData[27];
	A_head1_card.value = SaveData[28];
	A_head2.value = SaveData[29];
	A_head2_card.value = SaveData[30];
	A_head3.value = SaveData[31];
	A_HSE_HEAD1.value = SaveData[32];
	A_left.value = SaveData[33];
	A_left_card.value = SaveData[34];
	A_body.value = SaveData[35];
	A_body_card.value = SaveData[36];
	A_shoulder.value = SaveData[37];
	A_shoulder_card.value = SaveData[38];
	A_shoes.value = SaveData[39];
	A_shoes_card.value = SaveData[40];
	A_acces1.value = SaveData[41];
	A_acces1_card.value = SaveData[42];
	A_acces2.value = SaveData[43];
	A_acces2_card.value = SaveData[44];

	w = n_A_JOB;

	var ch = 0;
	for(var i=0;i<=14 && ch==0;i++){
		if(JobSkillPassOBJ[w][i]!=999){
			var wOBJ = document.getElementById("A_skill"+i);
			wOBJ.value = SaveData[45+i];
		}else
			ch = 1;
	}

	A_youshi.checked = SaveData[63];
	A_Weapon_zokusei.value = SaveData[64];
	for(i=0;i<=12;i++)
		n_A_PassSkill2[i] = SaveData[65+i];
	for(i=0;i<=12;i++)
		n_A_PassSkill2[i] = eval(n_A_PassSkill2[i]);
	if(n_SkillSW){
		A2_Skill0.value = n_A_PassSkill2[0];
		A2_Skill1.value = n_A_PassSkill2[1];
		A2_Skill2.value = n_A_PassSkill2[2];
		A2_Skill3.checked = n_A_PassSkill2[3];
		A2_Skill4.value = n_A_PassSkill2[4];
		A2_Skill5.checked = n_A_PassSkill2[5];
		A2_Skill6.checked = n_A_PassSkill2[6];
		A2_Skill7.checked = n_A_PassSkill2[7];
		A2_Skill8.value = n_A_PassSkill2[8];
		A2_Skill9.value = n_A_PassSkill2[9];
		A2_Skill10.value = n_A_PassSkill2[10];
		A2_Skill11.checked = n_A_PassSkill2[11];
		A2_Skill12.checked = n_A_PassSkill2[12];
	}
	if(SaveData[14] >= 3){
		A_HEAD_DEF_PLUS.value = SaveData[84];
		A_BODY_DEF_PLUS.value = SaveData[85];
		A_LEFT_DEF_PLUS.value = SaveData[86];
		A_SHOULDER_DEF_PLUS.value = SaveData[87];
		A_SHOES_DEF_PLUS.value = SaveData[88];
	}else{
		A_HEAD_DEF_PLUS.value = 0;
		A_BODY_DEF_PLUS.value = 0;
		A_LEFT_DEF_PLUS.value = 0;
		A_SHOULDER_DEF_PLUS.value = 0;
		A_SHOES_DEF_PLUS.value = 0;
	}
	//custom Talon Tales Kris Enchantment Load Cookie
	if(A_weapon1.value == 1472){
		A_KE11.value = SaveData[89];
		A_KE12.value = SaveData[90];
	}
	if (typeof(A_weapon2) != "undefined"){
		if(A_weapon2.value == 1472){
			A_KE21.value = SaveData[91];
			A_KE22.value = SaveData[92];
		}
	}
	for(var i=0;i < SQI_Bonus_Effect.length;i++)
			SQI_Bonus_Effect[i] = 0;
	//custom Talon Tales Kris Enchantment Load Cookie
	if (typeof(SaveData[93]) == "undefined"){		//to make sure cookies created before sqi save feature can be loaded
		SaveData[93] = 0;
		SaveData[94] = 0;
		SaveData[95] = 0;
		SaveData[96] = 0;
	}
	SQI_Bonus_Effect[0] = SaveData[93];
	SQI_Bonus_Effect[1] = SaveData[94];
	SQI_Bonus_Effect[2] = SaveData[95];
	SQI_Bonus_Effect[3] = SaveData[96];

	// [Custom Talon Tales - 2018-06-15 - Load Cookie for Malangdo Enchants] [Kato]
	A_ME11.value = SaveData[97];
	A_ME12.value = SaveData[98];
	A_ME21.value = SaveData[99];
	A_ME22.value = SaveData[100];

	// [Custom Talon Tales - 2018-07-10 - Load Cookie for Biolab Weapon Enchants] [NattWara]
	A_BE11.value = SaveData[101];
	A_BE12.value = SaveData[102];
	A_BE21.value = SaveData[103];
	A_BE22.value = SaveData[104];

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for Eden Weapon Enchants Slot 1] [NattWara]
	A_EE11.value = SaveData[105];
	A_EE21.value = SaveData[108];

	//Populate option for slot 2 depending on choice of slot 1
	//Weapon 1
	switch(A_EE11.value) {
	case "172":

			//Add Physical Damage 10% vs Race Option for Enchant slot 2.
			removeOptions(A_EE12);
			A_EE12.options[0] = new Option("(Eden Enchant "+ A_EE12.name.substr(-1) +")",0);
			for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length; i++) {
				A_EE12.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0]);
			}

		break;
	case "892":

			//Add Magical Damage 5% vs Race Option for Enchant slot 2.
			removeOptions(A_EE12);
			A_EE12.options[0] = new Option("(Eden Enchant "+ A_EE12.name.substr(-1) +")",0);
			for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length; i++) {
				A_EE12.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0]);
			}

		break;
	default:
		//Clear weapon 1 slot 2
		removeOptions(A_EE12);
		A_EE12.options[0] = new Option("(Eden Enchant "+ A_EE12.name.substr(-1) +")",0);
	}

	//Weapon 2
	switch(A_EE21.value) {
	case "172":

			//Add Physical Damage 10% vs Race Option for Enchant slot 2.
			removeOptions(A_EE22);
			A_EE22.options[0] = new Option("(Eden Enchant 2-"+ A_EE22.name.substr(-1) +")",0);
			for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length; i++) {
				A_EE22.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0]);
			}

		break;
	case "892":

			//Add Magical Damage 5% vs Race Option for Enchant slot 2.
			removeOptions(A_EE22);
			A_EE22.options[0] = new Option("(Eden Enchant 2-"+ A_EE22.name.substr(-1) +")",0);
			for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length; i++) {
				A_EE22.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0]);
			}

		break;
	default:
		//Clear weapon 2 slot 2
		removeOptions(A_EE22);
		A_EE22.options[0] = new Option("(Eden Enchant "+ A_EE22.name.substr(-1) +")",0);
	}

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for Eden Weapon Enchants Slot 2] [NattWara]
	A_EE12.value = SaveData[106];
	A_EE22.value = SaveData[109];

	//Populate option for slot 3 depending on choice of slot 1 and slot 2
	//Weapon 1

	//Clear weapon 1 slot 3
	removeOptions(A_EE13);
	A_EE13.options[0] = new Option("(Eden Enchant "+ A_EE13.name.substr(-1) +")",0);

	if (A_EE11.value != 0 && A_EE12.value != 0) {
		var option1Text = option2Text = "";

		for (i = EDEN_ENCHANTS_WEAPON_FIRST.length - 1; i >= 0; i--) {
			if (EDEN_ENCHANTS_WEAPON_FIRST[i][0] == A_EE11.value) {
				option1Text = EDEN_ENCHANTS_WEAPON_FIRST[i][1];
				break;
			}
		}

		if (A_EE12.value >= 2030 && A_EE12.value <= 2039) {
			for (i = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length - 1; i >= 0; i--) {
				if (EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0] == A_EE12.value) {
					option2Text = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1];
					break;
				}
			}
		}

		if (A_EE12.value >= 2170 && A_EE12.value <= 2179) {
			for (i = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length - 1; i >= 0; i--) {
				if (EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0] == A_EE12.value) {
					option2Text = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1];
					break;
				}
			}
		}

		A_EE13.options[1] = new Option(option1Text,A_EE11.value);
		A_EE13.options[2] = new Option(option2Text,A_EE12.value);
	}

	//Weapon 2

	//Clear weapon 2 slot 3
	removeOptions(A_EE23);
	A_EE23.options[0] = new Option("(Eden Enchant 2-"+ A_EE23.name.substr(-1) +")",0);

	if (A_EE21.value != 0 || A_EE22.value != 0) {
		var option1Text = option2Text = "";

		for (i = EDEN_ENCHANTS_WEAPON_FIRST.length - 1; i >= 0; i--) {
			if (EDEN_ENCHANTS_WEAPON_FIRST[i][0] == A_EE21.value) {
				option1Text = EDEN_ENCHANTS_WEAPON_FIRST[i][1];
				break;
			}
		}

		if (A_EE22.value >= 2030 && A_EE22.value <= 2039) {
			for (i = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length - 1; i >= 0; i--) {
				if (EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0] == A_EE22.value) {
					option2Text = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1];
					break;
				}
			}
		}

		if (A_EE22.value >= 2170 && A_EE22.value <= 2179) {
			for (i = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length - 1; i >= 0; i--) {
				if (EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0] == A_EE22.value) {
					option2Text = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1];
					break;
				}
			}
		}

		A_EE23.options[1] = new Option(option1Text,A_EE21.value);
		A_EE23.options[2] = new Option(option2Text,A_EE22.value);
	}

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for Eden Weapon Enchants Slot 3] [NattWara]
	A_EE13.value = SaveData[107];
	A_EE23.value = SaveData[110];

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for Biolab Armor Enchants] [NattWara]
	A_BEH1.value = SaveData[111];
	A_BEH2.value = SaveData[112];
	A_BEA1.value = SaveData[113];
	A_BEA2.value = SaveData[114];
	A_BES1.value = SaveData[115];
	A_BES2.value = SaveData[116];
	A_BEG1.value = SaveData[117];
	A_BEG2.value = SaveData[118];
	A_BEAC11.value = SaveData[119];
	A_BEAC12.value = SaveData[120];
	A_BEAC21.value = SaveData[121];
	A_BEAC22.value = SaveData[122];

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for Eden Armor Enchants] [NattWara]
	A_EEH.value = SaveData[123];
	A_EEA1.value = SaveData[124];
	A_EEA2.value = SaveData[125];
	A_EEG1.value = SaveData[126];
	A_EEG2.value = SaveData[127];
	A_EEF1.value = SaveData[128];
	A_EEF2.value = SaveData[129];

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for El Dicaste Enchants] [NattWara]
	A_EDG1.value = SaveData[130];
	A_EDG2.value = SaveData[131];
	A_EDG3.value = SaveData[132];
	A_EDF1.value = SaveData[133];
	A_EDF2.value = SaveData[134];
	A_EDF3.value = SaveData[135];
	A_EDAC11.value = SaveData[136];
	A_EDAC12.value = SaveData[137];
	A_EDAC13.value = SaveData[138];
	A_EDAC21.value = SaveData[139];
	A_EDAC22.value = SaveData[140];
	A_EDAC23.value = SaveData[141];
	A_EDLOED11.value = SaveData[142];
	A_EDLOED12.value = SaveData[143];
	A_EDLOED13.value = SaveData[144];
	A_EDLOED21.value = SaveData[145];
	A_EDLOED22.value = SaveData[146];
	A_EDLOED23.value = SaveData[147];

	// [Custom Talon Tales - 2018-07-13 - Load Cookie for Mora Enchants] [NattWara]
	A_MORAEA1.value = SaveData[148];
	A_MORAEA2.value = SaveData[149];
	A_MORAEA3.value = SaveData[150];
	A_MORAEG1.value = SaveData[151];
	A_MORAEG2.value = SaveData[152];
	A_MORAEG3.value = SaveData[153];
	A_MORAEAC11.value = SaveData[154];
	A_MORAEAC12.value = SaveData[155];
	A_MORAEAC13.value = SaveData[156];
	A_MORAEAC21.value = SaveData[157];
	A_MORAEAC22.value = SaveData[158];
	A_MORAEAC23.value = SaveData[159];
	
	// Retrieve build name
	document.calcForm.A_SlotName.value = (SaveData[160] == "undefined") ? document.calcForm.A_SlotName.defaultValue : SaveData[160];

	Click_SQI_Bonus(0);

	StCalc(1);
	StAllCalc();
	ActiveSkillSetPlus();
}}

function LoadCookie3(){

	SaveData = new Array();
	//custom Talon Tales adding char saves
	//old
	//for(k=1;k<=19;k++){
	//new
	for(k=1;k<=100;k++){
		cookieNum = "num0"+ (k-1);
		if(k == 9)
			cookieNum = "num0"+ k;
		if(k >= 10)
			cookieNum = "num"+ k;
		SaveData = document.cookie.split("; ");
		wStr = "";

		for(i=0;SaveData[i];i++){
			if(SaveData[i].substr(0,6) == cookieNum +"="){
				wStr = SaveData[i].substr(6,SaveData[i].length);
				break;
			}
		}

		//Decompress String - [NattWara] - 2018-07-15
		if (wStr.substr(0,1) == '_'){
			wStr = wStr.replace(/_/g, '');
			wStr += '='.repeat(4 - wStr.length % 4);
			wStr = Base64.btou(RawDeflate.inflate(Base64.fromBase64(wStr)));
		}

		if(wStr.substr(27,1) >= 1){
			SaveData[0] = wStr.substr(0,2);
			SaveData[0] = eval(SaveData[0]);
		}else{
			SaveData[0] = 998;
		}
		SaveData[63] = wStr.substr(132,1);
		SaveData[160] = wStr.substr(363, wStr.length);

		build_name = (SaveData[160] == "undefined") ? "" : " - " + SaveData[160];

		if(1<= SaveData[0] && SaveData[0] <=45){
			if(SaveData[63]==0)
				document.calcForm.A_SaveSlot.options[k-1] = new Option("Save "+k +": " + JobName[SaveData[0]] + build_name,cookieNum);
			else
				document.calcForm.A_SaveSlot.options[k-1] = new Option("Save"+k +": Baby "+JobName[SaveData[0]] + build_name,cookieNum);
		}
		else if(SaveData[0] == 999 || SaveData[0] == 0){
			document.calcForm.A_SaveSlot.options[k-1] = new Option("Save"+k +": Novice" + build_name,cookieNum);
		}
		else
			document.calcForm.A_SaveSlot.options[k-1] = new Option("Save "+k +": No Data",cookieNum);
	}
}

function NtoS2(n,keta){
	var strX = "";
	if(keta == 3){
		strX += n_NtoS2[Math.floor(n / 3844)];
		strX += n_NtoS2[Math.floor(n % 3844 / 62)];
		strX += n_NtoS2[n % 62];
	}else if(keta == 2){
		strX += n_NtoS2[Math.floor(n / 62)];
		strX += n_NtoS2[n % 62];
	}else{
		strX += n_NtoS2[n];
	}
	return strX;
}

function NtoS01(wb,wc,wd,we,wf){

	var n = 0;
	if(wb == true)
		n += 16;
	if(wc == true)
		n += 8;
	if(wd == true)
		n += 4;
	if(we == true)
		n += 2;
	if(wf == true)
		n += 1;
	return NtoS2(n,1);
}

function NtoS05(wa,wb){
	var n;
	n = wa * 6;
	n += wb;
	return NtoS2(n,1);
}


function URLOUT(){
with(document.calcForm){
	calc();
	SaveData = new Array();
	for(var i=0;i<=88;i++)
		SaveData[i]="a";

	SaveData[0] = NtoS2(2,1);
	SaveData[1] = NtoS2(eval(A_JOB.value),2);
	SaveData[2] = NtoS2(eval(A_BaseLV.value),2);
	SaveData[3] = NtoS2(eval(A_JobLV.value),2);
	SaveData[4] = NtoS2(eval(A_STR.value),2);
	SaveData[5] = NtoS2(eval(A_AGI.value),2);
	SaveData[6] = NtoS2(eval(A_VIT.value),2);
	SaveData[7] = NtoS2(eval(A_DEX.value),2);
	SaveData[8] = NtoS2(eval(A_INT.value),2);
	SaveData[9] = NtoS2(eval(A_LUK.value),2);
	SaveData[10] = NtoS2(eval(A_SpeedPOT.value) * 10 + eval(A_Weapon_zokusei.value),1);

	SaveData[11] = NtoS2(eval(A_WeaponType.value),1);
	if(n_Nitou)
		SaveData[12] = NtoS2(eval(A_Weapon2Type.value),1);

	if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && n_A_WeaponType!=0))
		SaveData[13] = NtoS2(eval(A_Arrow.value),1);

	SaveData[14] = NtoS2(eval(A_weapon1.value),2);
	SaveData[15] = NtoS2(eval(A_Weapon_ATKplus.value),1);
	SaveData[16] = NtoS2(eval(A_weapon1_card1.value),2);
	SaveData[17] = NtoS2(eval(A_weapon1_card2.value),2);
	SaveData[18] = NtoS2(eval(A_weapon1_card3.value),2);
	SaveData[19] = NtoS2(eval(A_weapon1_card4.value),2);
	if(n_Nitou){
		SaveData[20] = NtoS2(eval(A_weapon2.value),2);
		SaveData[21] = NtoS2(eval(A_Weapon2_ATKplus.value),1);
		SaveData[22] = NtoS2(eval(A_weapon2_card1.value),2);
		SaveData[23] = NtoS2(eval(A_weapon2_card2.value),2);
		SaveData[24] = NtoS2(eval(A_weapon2_card3.value),2);
		SaveData[25] = NtoS2(eval(A_weapon2_card4.value),2);
	}else{
		SaveData[20] = NtoS2(eval(A_left.value),2);
		SaveData[21] = NtoS2(eval(A_LEFT_DEF_PLUS.value),1);
		SaveData[22] = NtoS2(eval(A_left_card.value),2);
		SaveData[24] = SaveData[25] = SaveData[23] = NtoS2(0,2);;
	}
	SaveData[26] = NtoS2(eval(A_head1.value),2);
	SaveData[27] = NtoS2(eval(A_head1_card.value),2);
	SaveData[28] = NtoS2(eval(A_head2.value),2);
	SaveData[29] = NtoS2(eval(A_head2_card.value),2);
	SaveData[30] = NtoS2(eval(A_head3.value),2);
	SaveData[31] = NtoS2(eval(A_body.value),2);
	SaveData[32] = NtoS2(eval(A_body_card.value),2);
	SaveData[33] = NtoS2(eval(A_shoulder.value),2);
	SaveData[34] = NtoS2(eval(A_shoulder_card.value),2);
	SaveData[35] = NtoS2(eval(A_shoes.value),2);
	SaveData[36] = NtoS2(eval(A_shoes_card.value),2);
	SaveData[37] = NtoS2(eval(A_acces1.value),2);
	SaveData[38] = NtoS2(eval(A_acces1_card.value),2);
	SaveData[39] = NtoS2(eval(A_acces2.value),2);
	SaveData[40] = NtoS2(eval(A_acces2_card.value),2);
	SaveData[41] = NtoS2(eval(A_HEAD_DEF_PLUS.value),1);
	SaveData[42] = NtoS2(eval(A_BODY_DEF_PLUS.value),1);
	SaveData[43] = NtoS2(eval(A_SHOULDER_DEF_PLUS.value),1);
	SaveData[44] = NtoS2(eval(A_SHOES_DEF_PLUS.value),1);
	SaveData[45] = NtoS01(A_youshi.checked,0,0,0,0);

	n_A_JobSet();
	var w = n_A_JOB;

	var ch = 0;
	for(var i=0;i<=19 && ch==0;i++){
		if(JobSkillPassOBJ[w][i]!=999){
			var wOBJ = document.getElementById("A_skill"+i);
			SaveData[47+i] = NtoS2(eval(wOBJ.value),1);
		}else{
			SaveData[46] = NtoS2(i,1);
			ch = 1;
		}
	}

	var x = 47 + i - 1;
	for(var i=0;i<=14 && n_A_PassSkill2[i]==0;i++);
	if(i==15){
		SaveData[x] = NtoS2(0,1);
	}else{
		SaveData[x] = NtoS2(1,1);
		SaveData[x+1] = NtoS2(n_A_PassSkill2[0],1);
		SaveData[x+2] = NtoS2(n_A_PassSkill2[1],1);
		SaveData[x+3] = NtoS2(n_A_PassSkill2[4],1);
		SaveData[x+4] = NtoS2(n_A_PassSkill2[9],1);
		SaveData[x+5] = NtoS05(n_A_PassSkill2[2],n_A_PassSkill2[6]);
		SaveData[x+6] = NtoS05(n_A_PassSkill2[8],n_A_PassSkill2[10]);
		SaveData[x+7] = NtoS05(n_A_PassSkill2[13],n_A_PassSkill2[14]);
		SaveData[x+8] = NtoS01(n_A_PassSkill2[3],n_A_PassSkill2[5],n_A_PassSkill2[7],n_A_PassSkill2[11],n_A_PassSkill2[12]);
		x += 8;
	}

	SaveData[x+1] = NtoS2(A_ActiveSkill.value,2);


		SaveData[x+2] = NtoS2(eval(A_ActiveSkillLV.value),1);
	SaveData[x+3] = NtoS2(0,3);
	if(n_A_ActiveSkill==66 || n_A_ActiveSkill==326 || n_A_ActiveSkill==131 || n_A_ActiveSkill==88 || n_A_ActiveSkill==197 || n_A_ActiveSkill==394 || n_A_ActiveSkill==395 || n_A_ActiveSkill==405 || n_A_ActiveSkill==429)
		SaveData[x+3] = NtoS2(eval(SkillSubNum.value),3);
	SaveData[x+4] = NtoS2(n_B[0],2);
	x+=4;

	x+=1;
	for(var i=0;i<=24 && n_B_IJYOU[i]==0;i++);
	if(i==25){
		SaveData[x] = NtoS2(0,1);
	}else{
		SaveData[x] = NtoS2(1,1);
		SaveData[x+1] = NtoS2(n_B_IJYOU[0],1);
		SaveData[x+2] = NtoS05(n_B_IJYOU[1],n_B_IJYOU[18]);
		SaveData[x+3] = NtoS01(n_B_IJYOU[2],n_B_IJYOU[3],n_B_IJYOU[4],n_B_IJYOU[5],n_B_IJYOU[6]);
		SaveData[x+4] = NtoS01(n_B_IJYOU[7],n_B_IJYOU[8],n_B_IJYOU[9],n_B_IJYOU[10],n_B_IJYOU[19]);
		SaveData[x+5] = NtoS2(n_B_IJYOU[11],1);
		SaveData[x+6] = NtoS2(n_B_IJYOU[12],1);
		SaveData[x+7] = NtoS01(n_B_IJYOU[13],n_B_IJYOU[14],n_B_IJYOU[15],n_B_IJYOU[16],n_B_IJYOU[17]);
		SaveData[x+8] = NtoS01(n_B_IJYOU[20],n_B_IJYOU[21],n_B_IJYOU[22],0,0);
		SaveData[x+9] = NtoS05(n_B_IJYOU[23],n_B_IJYOU[24]);
		x+=9;
	}

	x+=1;
	for(var i=0;i<=10 && n_B_KYOUKA[i]==0;i++);
	if(i==11){
		SaveData[x] = NtoS2(0,1);
	}else{
		SaveData[x] = NtoS2(1,1);
		SaveData[x+1] = NtoS2(n_B_KYOUKA[0],1);
		SaveData[x+2] = NtoS01(n_B_KYOUKA[1],n_B_KYOUKA[2],n_B_KYOUKA[3],n_B_KYOUKA[4],n_B_KYOUKA[5]);
		SaveData[x+3] = NtoS2(n_B_KYOUKA[6],2);
		SaveData[x+4] = NtoS05(n_B_KYOUKA[7],n_B_KYOUKA[8]);
		SaveData[x+5] = NtoS01(n_B_KYOUKA[9],0,0,0,0);
		SaveData[x+6] = NtoS2(n_B_KYOUKA[10],1);
		x+=6;
	}

	x+=1;

	checkHIT = [0,0,0,0,0];

	for(var i=0;i<=36 && n_A_PassSkill3[i]==0;i++);
	if(i!=37)
		checkHIT[0] = 1;
	for(i=0;i<=4 && n_A_PassSkill3[40+i]==0;i++);
	if(i!=5)
		checkHIT[1] = 1;
	for(i=0;i<=5 && n_A_PassSkill5[i]==0;i++);
	if(i!=6)
		checkHIT[2] = 1;
	for(i=0;i<=6 && n_A_PassSkill6[i]==0;i++);
	if(i!=7)
		checkHIT[3] = 1;
	for(i=0;i<=15 && n_A_PassSkill7[i]==0;i++);
	if(i!=16)
		checkHIT[4] = 1;

	SaveData[x] = NtoS01(checkHIT[0],checkHIT[1],checkHIT[2],checkHIT[3],checkHIT[4]);

	if(checkHIT[0]){
		SaveData[x+1] = NtoS2(n_A_PassSkill3[0],1);
		SaveData[x+2] = NtoS2(n_A_PassSkill3[1],1);
		SaveData[x+3] = NtoS2(n_A_PassSkill3[2],1);
		SaveData[x+4] = NtoS2(n_A_PassSkill3[3],1);
		SaveData[x+5] = NtoS2(n_A_PassSkill3[4],1);
		SaveData[x+6] = NtoS2(n_A_PassSkill3[5],1);
		SaveData[x+7] = NtoS2(n_A_PassSkill3[6],1);
		SaveData[x+8] = NtoS05(n_A_PassSkill3[7],n_A_PassSkill3[8]);
		SaveData[x+9] = NtoS05(n_A_PassSkill3[9],n_A_PassSkill3[10]);
		SaveData[x+10] = NtoS01(n_A_PassSkill3[11],n_A_PassSkill3[18],0,0,0);
		SaveData[x+11] = NtoS2(n_A_PassSkill3[12],2);
		SaveData[x+12] = NtoS2(n_A_PassSkill3[13],2);
		SaveData[x+13] = NtoS2(n_A_PassSkill3[14],2);
		SaveData[x+14] = NtoS2(n_A_PassSkill3[15],2);
		SaveData[x+15] = NtoS2(n_A_PassSkill3[16],2);
		SaveData[x+16] = NtoS2(n_A_PassSkill3[17],2);
		SaveData[x+17] = NtoS2(n_A_PassSkill3[20],2);
		SaveData[x+18] = NtoS2(n_A_PassSkill3[30],1);
		SaveData[x+19] = NtoS2(n_A_PassSkill3[21],2);
		SaveData[x+20] = NtoS2(n_A_PassSkill3[31],1);
		SaveData[x+21] = NtoS2(n_A_PassSkill3[22],2);
		SaveData[x+22] = NtoS2(n_A_PassSkill3[29],2);
		SaveData[x+23] = NtoS2(n_A_PassSkill3[32],1);
		SaveData[x+24] = NtoS2(n_A_PassSkill3[23],2);
		SaveData[x+25] = NtoS2(n_A_PassSkill3[33],1);
		SaveData[x+26] = NtoS2(n_A_PassSkill3[24],2);
		SaveData[x+27] = NtoS2(n_A_PassSkill3[34],1);
		SaveData[x+28] = NtoS2(n_A_PassSkill3[25],2);
		SaveData[x+29] = NtoS2(n_A_PassSkill3[35],1);
		SaveData[x+30] = NtoS2(n_A_PassSkill3[26],2);
		SaveData[x+31] = NtoS2(n_A_PassSkill3[36],1);
		SaveData[x+32] = NtoS2(n_A_PassSkill3[46],2); // Bard's LUK - A Whistle
		x+=32;
	}

	if(checkHIT[1]){
		SaveData[x+1] = NtoS01(n_A_PassSkill3[40],0,0,0,0);
		SaveData[x+2] = NtoS05(n_A_PassSkill3[41],n_A_PassSkill3[42]);
		SaveData[x+3] = NtoS05(n_A_PassSkill3[43],n_A_PassSkill3[44]);
		x+=3;
	}

	if(checkHIT[2]){
		SaveData[x+1] = NtoS01(n_A_PassSkill5[0],n_A_PassSkill5[1],n_A_PassSkill5[2],n_A_PassSkill5[3],n_A_PassSkill5[4]);
		SaveData[x+2] = NtoS01(n_A_PassSkill5[5],0,0,0,0);
		x+=2;
	}

	if(checkHIT[3]){
		SaveData[x+1] = NtoS05(n_A_PassSkill6[0],n_A_PassSkill6[1]);
		SaveData[x+2] = NtoS05(n_A_PassSkill6[2],n_A_PassSkill6[4]);
		SaveData[x+3] = NtoS05(n_A_PassSkill6[5],0);
		SaveData[x+4] = NtoS2(n_A_PassSkill6[3],1);
		SaveData[x+5] = NtoS01(n_A_PassSkill6[6],0,0,0,0);
		x+=5;
	}

	if(checkHIT[4]){
		SaveData[x+1] = NtoS2(n_A_PassSkill7[3],2);
		SaveData[x+2] = NtoS2(n_A_PassSkill7[4],2);
		SaveData[x+3] = NtoS2(n_A_PassSkill7[5],2);
		SaveData[x+4] = NtoS2(n_A_PassSkill7[6],2);
		SaveData[x+5] = NtoS2(n_A_PassSkill7[7],2);
		SaveData[x+6] = NtoS2(n_A_PassSkill7[8],2);
		SaveData[x+7] = NtoS01(n_A_PassSkill7[0],n_A_PassSkill7[1],n_A_PassSkill7[2],n_A_PassSkill7[9],n_A_PassSkill7[10]);
		SaveData[x+8] = NtoS01(n_A_PassSkill7[11],n_A_PassSkill7[12],n_A_PassSkill7[13],n_A_PassSkill7[14],n_A_PassSkill7[15]);
		x+=8;
	}

	//SaveData[x+1] = NtoS2(parseInt(document.calcForm.Conf01.value),2);
	SaveData[x+1] = NtoS2(33,2);
	x+=1;

	SaveData[x+1] = NtoS2(parseInt(document.calcForm.A_HSE.value),2);
	x+=1;
	SaveData[x+1] = NtoS2(parseInt(document.calcForm.A_HSE_HEAD1.value),2);
	x+=1;

	//custom Talon Tales Kris Enchantment SAVE URL
	/*
	if(A_weapon1.value == 1472){
		SaveData[x+1] = NtoS2(parseInt(A_KE11.value),2);
		SaveData[x+2] = NtoS2(parseInt(A_KE12.value),2);
		x+=2;
	}
	if (typeof(A_weapon2) != "undefined"){
		if(A_weapon2.value == 1472){
			SaveData[x+1] = NtoS2(parseInt(A_KE21.value),2);
			SaveData[x+2] = NtoS2(parseInt(A_KE22.value),2);
			x+=2;
		}
	}
	*/
	SaveData[x+1] = NtoS2(parseInt(A_KE11.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_KE12.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_KE21.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_KE22.value),2);
	x+=4;

	//custom Talon Tales SQI interface
	x_sqibonus=0;
	SaveData[x+1] = NtoS2(0,1);
	for(i=0;i<=3 && SQI_Bonus_Effect[i]==0;i++);
	if(i!=4){
		x_sqibonus = 1;
		SaveData[x+1] = NtoS2(1,1);					//if any sqi bonus was activated set 1, else 0
	}
	x+=1;

	//custom Talon Tales SQI interface SAVE URL
	if (x_sqibonus){
		SaveData[x+1] = NtoS2(SQI_Bonus_Effect[0],2);
		SaveData[x+2] = NtoS2(SQI_Bonus_Effect[1],2);
		SaveData[x+3] = NtoS2(SQI_Bonus_Effect[2],2);
		SaveData[x+4] = NtoS2(SQI_Bonus_Effect[3],2);
		x+=4;
	}

	//[Custom Talon Tales 2018-06-15 - SAVE URL] [Kato]
	/*
	SaveData[x+1] = NtoS2(parseInt(document.calcForm.A_ME11.value),2);
	SaveData[x+2] = NtoS2(parseInt(document.calcForm.A_ME12.value),2);
	x+=2;
	if (typeof(A_weapon2) != "undefined"){
		SaveData[x+1] = NtoS2(parseInt(document.calcForm.A_ME21.value),2);
		SaveData[x+2] = NtoS2(parseInt(document.calcForm.A_ME22.value),2);
	}
	x+=2;
	*/
	SaveData[x+1] = NtoS2(parseInt(document.calcForm.A_ME11.value),2);
	SaveData[x+2] = NtoS2(parseInt(document.calcForm.A_ME12.value),2);
	SaveData[x+3] = NtoS2(parseInt(document.calcForm.A_ME21.value),2);
	SaveData[x+4] = NtoS2(parseInt(document.calcForm.A_ME22.value),2);
	x+=4;

	//[Custom Talon Tales 2018-07-14 - Save URL for Biolab Weapon] [NattWara]
	SaveData[x+1] = NtoS2(parseInt(A_BE11.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_BE12.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_BE21.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_BE22.value),2);
	x+=4;

	//[Custom Talon Tales 2018-07-14 - Save URL for Eden Weapon] [NattWara]
	SaveData[x+1] = NtoS2(parseInt(A_EE11.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_EE12.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_EE13.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_EE21.value),2);
	SaveData[x+5] = NtoS2(parseInt(A_EE22.value),2);
	SaveData[x+6] = NtoS2(parseInt(A_EE23.value),2);
	x+=6;

	//[Custom Talon Tales 2018-07-14 - Save URL for Biolab Armor] [NattWara]
	SaveData[x+1] = NtoS2(parseInt(A_BEH1.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_BEH2.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_BEA1.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_BEA2.value),2);
	SaveData[x+5] = NtoS2(parseInt(A_BES1.value),2);
	SaveData[x+6] = NtoS2(parseInt(A_BES2.value),2);
	SaveData[x+7] = NtoS2(parseInt(A_BEG1.value),2);
	SaveData[x+8] = NtoS2(parseInt(A_BEG2.value),2);
	SaveData[x+9] = NtoS2(parseInt(A_BEAC11.value),2);
	SaveData[x+10] = NtoS2(parseInt(A_BEAC12.value),2);
	SaveData[x+11] = NtoS2(parseInt(A_BEAC21.value),2);
	SaveData[x+12] = NtoS2(parseInt(A_BEAC22.value),2);
	x+=12;

	//[Custom Talon Tales 2018-07-14 - Save URL for Eden Armor] [NattWara]
	SaveData[x+1] = NtoS2(parseInt(A_EEH.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_EEA1.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_EEA2.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_EEG1.value),2);
	SaveData[x+5] = NtoS2(parseInt(A_EEG2.value),2);
	SaveData[x+6] = NtoS2(parseInt(A_EEF1.value),2);
	SaveData[x+7] = NtoS2(parseInt(A_EEF2.value),2);
	x+=7;

	//[Custom Talon Tales 2018-07-14 - Save URL for El Dicaste] [NattWara]
	SaveData[x+1] = NtoS2(parseInt(A_EDG1.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_EDG2.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_EDG3.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_EDF1.value),2);
	SaveData[x+5] = NtoS2(parseInt(A_EDF2.value),2);
	SaveData[x+6] = NtoS2(parseInt(A_EDF3.value),2);
	SaveData[x+7] = NtoS2(parseInt(A_EDAC11.value),2);
	SaveData[x+8] = NtoS2(parseInt(A_EDAC12.value),2);
	SaveData[x+9] = NtoS2(parseInt(A_EDAC13.value),2);
	SaveData[x+10] = NtoS2(parseInt(A_EDAC21.value),2);
	SaveData[x+11] = NtoS2(parseInt(A_EDAC22.value),2);
	SaveData[x+12] = NtoS2(parseInt(A_EDAC23.value),2);
	SaveData[x+13] = NtoS2(parseInt(A_EDLOED11.value),2);
	SaveData[x+14] = NtoS2(parseInt(A_EDLOED12.value),2);
	SaveData[x+15] = NtoS2(parseInt(A_EDLOED13.value),2);
	SaveData[x+16] = NtoS2(parseInt(A_EDLOED21.value),2);
	SaveData[x+17] = NtoS2(parseInt(A_EDLOED22.value),2);
	SaveData[x+18] = NtoS2(parseInt(A_EDLOED23.value),2);
	x+=18;

	//[Custom Talon Tales 2018-07-14 - Save URL for Mora] [NattWara]
	SaveData[x+1] = NtoS2(parseInt(A_MORAEA1.value),2);
	SaveData[x+2] = NtoS2(parseInt(A_MORAEA2.value),2);
	SaveData[x+3] = NtoS2(parseInt(A_MORAEA3.value),2);
	SaveData[x+4] = NtoS2(parseInt(A_MORAEG1.value),2);
	SaveData[x+5] = NtoS2(parseInt(A_MORAEG2.value),2);
	SaveData[x+6] = NtoS2(parseInt(A_MORAEG3.value),2);
	SaveData[x+7] = NtoS2(parseInt(A_MORAEAC11.value),2);
	SaveData[x+8] = NtoS2(parseInt(A_MORAEAC12.value),2);
	SaveData[x+9] = NtoS2(parseInt(A_MORAEAC13.value),2);
	SaveData[x+10] = NtoS2(parseInt(A_MORAEAC21.value),2);
	SaveData[x+11] = NtoS2(parseInt(A_MORAEAC22.value),2);
	SaveData[x+12] = NtoS2(parseInt(A_MORAEAC23.value),2);
	x+=12;

	wStr = "" +SaveData[0];
	for(i=1;i<=x;i++){
		wStr += ""+SaveData[i];
	}
	
	// Save build name in serialization
	wStr += document.calcForm.A_SlotName.value;

	//Compress String - [NattWara] - 2018-07-15
	var comp_wStr = Base64.toBase64(RawDeflate.deflate(wStr));
	comp_wStr = comp_wStr.replace(/=/g, '');

	if (comp_wStr.length < wStr.length-1) {
		wStr = '_' + comp_wStr;
	}

	var w = location.href.split("?");
	URL_TEXT.value = w[0] +"?"+ wStr;
	URL_TEXT.select();
}}

function StoNx(n){
	n += "";
	for(var i=0;i<=61;i++)
		if(n == n_NtoS2[i])
			return i;
}

function StoN2(n){
	n += "";
	var keta = n.length;
	if(keta == 3){
		var w = n.charAt(0);
		var x = StoNx(w) * 62 * 62;
		w = n.charAt(1);
		x += StoNx(w) * 62;
		w = n.charAt(2);
		x += StoNx(w);
	}else if(keta == 2){
		var w = n.charAt(0);
		var x = StoNx(w) * 62;
		w = n.charAt(1);
		x += StoNx(w);
	}else{
		var w = n.charAt(0);
		var x = StoNx(w);
	}
	return x;
}

function URLIN(){
with(document.calcForm){

	var r = /\?/;
	var w = location.href.match(r);
	if(w){
		var SaveData = new Array();
		SaveData = location.href.split("?");
		var w = SaveData[1];

		//Decompress String - [NattWara] - 2018-07-15
		if (w.substr(0,1) == '_'){
			w = w.replace(/_/g, '');
			w += '='.repeat(4 - w.length % 4);
			w = Base64.btou(RawDeflate.inflate(Base64.fromBase64(w)));
		}

		if(StoN2(w.substr(1,2)) == 20 && StoN2(w.substr(90,1)))
			SuperNoviceFullWeaponCHECK = 1;
		else
			SuperNoviceFullWeaponCHECK = 0;
		var w_Version = StoN2(w.substr(0,1));
		A_JOB.value = StoN2(w.substr(1,2));
		ClickJob(StoN2(w.substr(1,2)),2);
		A_BaseLV.value = StoN2(w.substr(3,2));
		A_JobLV.value = StoN2(w.substr(5,2));
		A_STR.value = StoN2(w.substr(7,2));
		A_AGI.value = StoN2(w.substr(9,2));
		A_VIT.value = StoN2(w.substr(11,2));
		A_DEX.value = StoN2(w.substr(13,2));
		A_INT.value = StoN2(w.substr(15,2));
		A_LUK.value = StoN2(w.substr(17,2));
		A_SpeedPOT.value = Math.floor(StoN2(w.substr(19,1)) / 10);
		A_Weapon_zokusei.value = StoN2(w.substr(19,1)) % 10;
		A_WeaponType.value = StoN2(w.substr(20,1));

		ClickWeaponType(A_WeaponType.value);
		if((A_JOB.value == 8 || A_JOB.value == 22) && A_WeaponType.value != 11){
			A_Weapon2Type.value = StoN2(w.substr(21,1));
			ClickWeaponType2(A_Weapon2Type.value);
		}
		n_A_JobSet();

		if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && n_A_WeaponType!=0))
			A_Arrow.value = StoN2(w.substr(22,1));
		A_weapon1.value = StoN2(w.substr(23,2));
		A_Weapon_ATKplus.value = StoN2(w.substr(25,1));
		A_weapon1_card1.value = StoN2(w.substr(26,2));
		A_weapon1_card2.value = StoN2(w.substr(28,2));
		A_weapon1_card3.value = StoN2(w.substr(30,2));
		A_weapon1_card4.value = StoN2(w.substr(32,2));
		if(n_Nitou){
			A_weapon2.value = StoN2(w.substr(34,2));
			A_Weapon2_ATKplus.value = StoN2(w.substr(36,1));
			A_weapon2_card1.value = StoN2(w.substr(37,2));
			A_weapon2_card2.value = StoN2(w.substr(39,2));
			A_weapon2_card3.value = StoN2(w.substr(41,2));
			A_weapon2_card4.value = StoN2(w.substr(43,2));
		}else{
			A_left.value = StoN2(w.substr(34,2));
			A_LEFT_DEF_PLUS.value = StoN2(w.substr(36,1));
			A_left_card.value = StoN2(w.substr(37,2));
		}
		A_head1.value = StoN2(w.substr(45,2));
		A_head1_card.value = StoN2(w.substr(47,2));
		A_head2.value = StoN2(w.substr(49,2));
		A_head2_card.value = StoN2(w.substr(51,2));
		A_head3.value = StoN2(w.substr(53,2));
		A_body.value = StoN2(w.substr(55,2));
		A_body_card.value = StoN2(w.substr(57,2));
		A_shoulder.value = StoN2(w.substr(59,2));
		A_shoulder_card.value = StoN2(w.substr(61,2));
		A_shoes.value = StoN2(w.substr(63,2));
		A_shoes_card.value = StoN2(w.substr(65,2));
		A_acces1.value = StoN2(w.substr(67,2));
		A_acces1_card.value = StoN2(w.substr(69,2));
		A_acces2.value = StoN2(w.substr(71,2));
		A_acces2_card.value = StoN2(w.substr(73,2));
		A_HEAD_DEF_PLUS.value = StoN2(w.substr(75,1));
		A_BODY_DEF_PLUS.value = StoN2(w.substr(76,1));
		A_SHOULDER_DEF_PLUS.value = StoN2(w.substr(77,1));
		A_SHOES_DEF_PLUS.value = StoN2(w.substr(78,1));
		var wn = StoN2(w.substr(79,1));
		A_youshi.checked = Math.floor(wn / 16);

		var max = StoN2(w.substr(80,1));
		for(var i=0;i<max;i++){
			var wOBJ = document.getElementById("A_skill"+i);
			wOBJ.value = StoN2(w.substr(81+i,1));
		}

		var x = 81 + i;
		if(StoN2(w.substr(x,1)) == 1){
			n_A_PassSkill2[0] = StoN2(w.substr(x+1,1));
			n_A_PassSkill2[1] = StoN2(w.substr(x+2,1));
			n_A_PassSkill2[4] = StoN2(w.substr(x+3,1));
			n_A_PassSkill2[9] = StoN2(w.substr(x+4,1));
			n_A_PassSkill2[2] = Math.floor(StoN2(w.substr(x+5,1)) / 6);
			n_A_PassSkill2[6] = StoN2(w.substr(x+5,1)) % 6;
			n_A_PassSkill2[8] = Math.floor(StoN2(w.substr(x+6,1)) / 6);
			n_A_PassSkill2[10] = StoN2(w.substr(x+6,1)) % 6;
			n_A_PassSkill2[13] = Math.floor(StoN2(w.substr(x+7,1)) / 6);
			n_A_PassSkill2[14] = StoN2(w.substr(x+7,1)) % 6;
			var wn = StoN2(w.substr(x+8,1));
			n_A_PassSkill2[3] = Math.floor(wn / 16);
			n_A_PassSkill2[5] = Math.floor(wn % 16 / 8);
			n_A_PassSkill2[7] = Math.floor(wn % 8 / 4);
			n_A_PassSkill2[11] = Math.floor(wn % 4 / 2);
			n_A_PassSkill2[12] = Math.floor(wn % 2 / 1);
			x+=8;
		}


		var BackupX = x;
		/*
		A_ActiveSkill.value = StoN2(w.substr(x+1,2));

		ClickActiveSkill();
		A_ActiveSkillLV.value = StoN2(w.substr(x+3,1));

		if(n_A_ActiveSkill==66 || n_A_ActiveSkill==326 || n_A_ActiveSkill==131 || n_A_ActiveSkill==88 || n_A_ActiveSkill==197 || n_A_ActiveSkill==394 || n_A_ActiveSkill==395 || n_A_ActiveSkill==405)
			SkillSubNum.value = StoN2(w.substr(x+4,3));

		B_Enemy.value = StoN2(w.substr(x+7,2));
		*/
		x+=8;

		x+=1;
		if(StoN2(w.substr(x,1)) == 1){
			n_B_IJYOU[0] = StoN2(w.substr(x+1,1));
			n_B_IJYOU[1] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
			n_B_IJYOU[18] = StoN2(w.substr(x+2,1)) % 6;
			var wn = StoN2(w.substr(x+3,1));
			n_B_IJYOU[2] = Math.floor(wn / 16);
			n_B_IJYOU[3] = Math.floor(wn % 16 / 8);
			n_B_IJYOU[4] = Math.floor(wn % 8 / 4);
			n_B_IJYOU[5] = Math.floor(wn % 4 / 2);
			n_B_IJYOU[6] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+4,1));
			n_B_IJYOU[7] = Math.floor(wn / 16);
			n_B_IJYOU[8] = Math.floor(wn % 16 / 8);
			n_B_IJYOU[9] = Math.floor(wn % 8 / 4);
			n_B_IJYOU[10] = Math.floor(wn % 4 / 2);
			n_B_IJYOU[19] = Math.floor(wn % 2 / 1);
			n_B_IJYOU[11] = StoN2(w.substr(x+5,1));
			n_B_IJYOU[12] = StoN2(w.substr(x+6,1));
			wn = StoN2(w.substr(x+7,1));
			n_B_IJYOU[13] = Math.floor(wn / 16);
			n_B_IJYOU[14] = Math.floor(wn % 16 / 8);
			n_B_IJYOU[15] = Math.floor(wn % 8 / 4);
			n_B_IJYOU[16] = Math.floor(wn % 4 / 2);
			n_B_IJYOU[17] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+8,1));
			n_B_IJYOU[20] = Math.floor(wn / 16);
			n_B_IJYOU[21] = Math.floor(wn % 16 / 8);
			n_B_IJYOU[22] = Math.floor(wn % 8 / 4);
			n_B_IJYOU[23] = Math.floor(StoN2(w.substr(x+9,1)) / 6);
			n_B_IJYOU[24] = StoN2(w.substr(x+9,1)) % 6;
			x+=9;
		}

		x+=1;
		if(StoN2(w.substr(x,1)) == 1){
			n_B_KYOUKA[0] = StoN2(w.substr(x+1,1));
			var wn = StoN2(w.substr(x+2,1));
			n_B_KYOUKA[1] = Math.floor(wn / 16);
			n_B_KYOUKA[2] = Math.floor(wn % 16 / 8);
			n_B_KYOUKA[3] = Math.floor(wn % 8 / 4);
			n_B_KYOUKA[4] = Math.floor(wn % 4 / 2);
			n_B_KYOUKA[5] = Math.floor(wn % 2 / 1);
			n_B_KYOUKA[6] = StoN2(w.substr(x+3,2));
			n_B_KYOUKA[7] = Math.floor(StoN2(w.substr(x+5,1)) / 6);
			n_B_KYOUKA[8] = StoN2(w.substr(x+5,1)) % 6;
			wn = StoN2(w.substr(x+6,1));
			n_B_KYOUKA[9] = Math.floor(wn / 16);
			n_B_KYOUKA[10] = StoN2(w.substr(x+7,1));
			x += 7;
		}

		var checkHIT = [0,0,0,0,0];
		wn = StoN2(w.substr(x+1,1));
		checkHIT[0] = Math.floor(wn / 16);
		checkHIT[1] = Math.floor(wn % 16 / 8);
		checkHIT[2] = Math.floor(wn % 8 / 4);
		checkHIT[3] = Math.floor(wn % 4 / 2);
		checkHIT[4] = Math.floor(wn % 2 / 1);
		x+=1;

		if(checkHIT[0]){
			n_A_PassSkill3[0] = StoN2(w.substr(x+1,1));
			n_A_PassSkill3[1] = StoN2(w.substr(x+2,1));
			n_A_PassSkill3[2] = StoN2(w.substr(x+3,1));
			n_A_PassSkill3[3] = StoN2(w.substr(x+4,1));
			n_A_PassSkill3[4] = StoN2(w.substr(x+5,1));
			n_A_PassSkill3[5] = StoN2(w.substr(x+6,1));
			n_A_PassSkill3[6] = StoN2(w.substr(x+7,1));
			n_A_PassSkill3[7] = Math.floor(StoN2(w.substr(x+8,1)) / 6);
			n_A_PassSkill3[8] = StoN2(w.substr(x+8,1)) % 6;
			n_A_PassSkill3[9] = Math.floor(StoN2(w.substr(x+9,1)) / 6);
			n_A_PassSkill3[10] = StoN2(w.substr(x+9,1)) % 6;
			n_A_PassSkill3[11] = Math.floor(StoN2(w.substr(x+10,1)) / 16);
			n_A_PassSkill3[18] = Math.floor(StoN2(w.substr(x+10,1)) % 16 / 8);
			n_A_PassSkill3[12] = StoN2(w.substr(x+11,2));
			n_A_PassSkill3[13] = StoN2(w.substr(x+13,2));
			n_A_PassSkill3[14] = StoN2(w.substr(x+15,2));
			n_A_PassSkill3[15] = StoN2(w.substr(x+17,2));
			n_A_PassSkill3[16] = StoN2(w.substr(x+19,2));
			n_A_PassSkill3[17] = StoN2(w.substr(x+21,2));
			n_A_PassSkill3[20] = StoN2(w.substr(x+23,2));
			n_A_PassSkill3[30] = StoN2(w.substr(x+25,1));
			n_A_PassSkill3[21] = StoN2(w.substr(x+26,2));
			n_A_PassSkill3[31] = StoN2(w.substr(x+28,1));
			n_A_PassSkill3[22] = StoN2(w.substr(x+29,2));
			n_A_PassSkill3[29] = StoN2(w.substr(x+31,2));
			n_A_PassSkill3[32] = StoN2(w.substr(x+33,1));
			n_A_PassSkill3[23] = StoN2(w.substr(x+34,2));
			n_A_PassSkill3[33] = StoN2(w.substr(x+36,1));
			n_A_PassSkill3[24] = StoN2(w.substr(x+37,2));
			n_A_PassSkill3[34] = StoN2(w.substr(x+39,1));
			n_A_PassSkill3[25] = StoN2(w.substr(x+40,2));
			n_A_PassSkill3[35] = StoN2(w.substr(x+42,1));
			n_A_PassSkill3[26] = StoN2(w.substr(x+43,2));
			n_A_PassSkill3[36] = StoN2(w.substr(x+45,1));
			n_A_PassSkill3[46] = StoN2(w.substr(x+46,2));
			x+=47;
		}

		if(checkHIT[1]){
			var wn = StoN2(w.substr(x+1,1));
			n_A_PassSkill3[40] = Math.floor(wn / 16);
			n_A_PassSkill3[41] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
			n_A_PassSkill3[42] = StoN2(w.substr(x+2,1)) % 6;
			n_A_PassSkill3[43] = Math.floor(StoN2(w.substr(x+3,1)) / 6);
			n_A_PassSkill3[44] = StoN2(w.substr(x+3,1)) % 6;
			x+=3;
		}

		if(checkHIT[2]){
			wn = StoN2(w.substr(x+1,1));
			n_A_PassSkill5[0] = Math.floor(wn / 16);
			n_A_PassSkill5[1] = Math.floor(wn % 16 / 8);
			n_A_PassSkill5[2] = Math.floor(wn % 8 / 4);
			n_A_PassSkill5[3] = Math.floor(wn % 4 / 2);
			n_A_PassSkill5[4] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+2,1));
			n_A_PassSkill5[5] = Math.floor(wn / 16);
			x+=2;
		}

		if(checkHIT[3]){
			n_A_PassSkill6[0] = Math.floor(StoN2(w.substr(x+1,1)) / 6);
			n_A_PassSkill6[1] = StoN2(w.substr(x+1,1)) % 6;
			n_A_PassSkill6[2] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
			n_A_PassSkill6[4] = StoN2(w.substr(x+2,1)) % 6;
			n_A_PassSkill6[5] = Math.floor(StoN2(w.substr(x+3,1)) / 6);
			n_A_PassSkill6[3] = StoN2(w.substr(x+4,1));
			wn = StoN2(w.substr(x+5,1));
			n_A_PassSkill6[6] = Math.floor(wn / 16);
			x+=5;
		}

		if(checkHIT[4]){
			n_A_PassSkill7[3] = StoN2(w.substr(x+1,2));
			n_A_PassSkill7[4] = StoN2(w.substr(x+3,2));
			n_A_PassSkill7[5] = StoN2(w.substr(x+5,2));
			n_A_PassSkill7[6] = StoN2(w.substr(x+7,2));
			n_A_PassSkill7[7] = StoN2(w.substr(x+9,2));
			n_A_PassSkill7[8] = StoN2(w.substr(x+11,2));
			wn = StoN2(w.substr(x+13,1));
			n_A_PassSkill7[0] = Math.floor(wn / 16);
			n_A_PassSkill7[1] = Math.floor(wn % 16 / 8);
			n_A_PassSkill7[2] = Math.floor(wn % 8 / 4);
			n_A_PassSkill7[9] = Math.floor(wn % 4 / 2);
			n_A_PassSkill7[10] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+14,1));
			n_A_PassSkill7[11] = Math.floor(wn / 16);
			n_A_PassSkill7[12] = Math.floor(wn % 16 / 8);
			n_A_PassSkill7[13] = Math.floor(wn % 8 / 4);
			n_A_PassSkill7[14] = Math.floor(wn % 4 / 2);
			n_A_PassSkill7[15] = Math.floor(wn % 2 / 1);
			x+=14;
		}

		x+=2;
		if(w_Version >= 1){
			document.calcForm.A_HSE.value = StoN2(w.substr(x+1,2));
			x+=2;
		}
		if(w_Version >= 2){
			document.calcForm.A_HSE_HEAD1.value = StoN2(w.substr(x+1,2));
			x+=2;
		}
		
		//custom Talon Tales Kris Enchantment LOAD URL
		A_KE11.value = StoN2(w.substr(x+1,2));
		A_KE12.value = StoN2(w.substr(x+3,2));
		A_KE21.value = StoN2(w.substr(x+5,2));
		A_KE22.value = StoN2(w.substr(x+7,2));
		x+=8

		//custom Talon Tales SQI interface SAVE URL
		x_sqibonus=StoN2(w.substr(x+1,1));					//check if any sqi bonus was activated (0=none;1=activated)
		x+=1;
		if (x_sqibonus){
			SQI_Bonus_Effect[0] = StoN2(w.substr(x+1,2));
			SQI_Bonus_Effect[1] = StoN2(w.substr(x+3,2));
			SQI_Bonus_Effect[2] = StoN2(w.substr(x+5,2));
			SQI_Bonus_Effect[3] = StoN2(w.substr(x+7,2));
			x+=8;
		}

		//[Custom Talon Tales 2018-06-15 - LOAD URL] [Kato]
		/*
		if((StoN2(w.substr(x+1,2)) != "undefined"))
			A_ME11.value = StoN2(w.substr(x+1,2));
		else
			A_ME11.value = 0;

		if((StoN2(w.substr(x+3,2)) != "undefined"))
			A_ME12.value = StoN2(w.substr(x+3,2));
		else
			A_ME12.value = 0;

		x+=4;

		if((StoN2(w.substr(x+1,2)) != "undefined"))
			A_ME21.value = StoN2(w.substr(x+1,2));
		else
			A_ME21.value = 0;

		if((StoN2(w.substr(x+3,2)) != "undefined"))
			A_ME22.value = StoN2(w.substr(x+3,2));
		else
			A_ME22.value = 0;

		x+=4;
		*/
		A_ME11.value = StoN2(w.substr(x+1,2));
		A_ME12.value = StoN2(w.substr(x+3,2));
		A_ME21.value = StoN2(w.substr(x+5,2));
		A_ME22.value = StoN2(w.substr(x+7,2));
		x+=8;

		// [Custom Talon Tales - 2018-07-14 - Load URL for Biolab Weapon Enchants] [NattWara]
		A_BE11.value = StoN2(w.substr(x+1,2));
		A_BE12.value = StoN2(w.substr(x+3,2));
		A_BE21.value = StoN2(w.substr(x+5,2));
		A_BE22.value = StoN2(w.substr(x+7,2));
		x+=8;

		// [Custom Talon Tales - 2018-07-14 - Load URL for Eden Weapon Enchants Slot 1] [NattWara]
		A_EE11.value = StoN2(w.substr(x+1,2));
		A_EE21.value = StoN2(w.substr(x+7,2));

		//Populate option for slot 2 depending on choice of slot 1
		//Weapon 1
		switch(A_EE11.value) {
		case "172":
			if (!(A_EE12.value >= 2030 && A_EE12.value <= 2039)) {
				//Add Physical Damage 10% vs Race Option for Enchant slot 2.
				removeOptions(A_EE12);
				A_EE12.options[0] = new Option("(Eden Enchant "+ A_EE12.name.substr(-1) +")",0);
				for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length; i++) {
					A_EE12.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0]);
				}
			}
			break;
		case "892":
			if (!(A_EE12.value >= 2170 && A_EE12.value <= 2179)) {
				//Add Magical Damage 5% vs Race Option for Enchant slot 2.
				removeOptions(A_EE12);
				A_EE12.options[0] = new Option("(Eden Enchant "+ A_EE12.name.substr(-1) +")",0);
				for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length; i++) {
					A_EE12.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0]);
				}
			}
			break;
		default:
			//Clear weapon 1 slot 2
			removeOptions(A_EE12);
			A_EE12.options[0] = new Option("(Eden Enchant "+ A_EE12.name.substr(-1) +")",0);
		}

		//Weapon 2
		switch(A_EE21.value) {
		case "172":
			if (!(A_EE22.value >= 2030 && A_EE22.value <= 2039)) {
				//Add Physical Damage 10% vs Race Option for Enchant slot 2.
				removeOptions(A_EE22);
				A_EE22.options[0] = new Option("(Eden Enchant 2-"+ A_EE22.name.substr(-1) +")",0);
				for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length; i++) {
					A_EE22.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0]);
				}
			}
			break;
		case "892":
			if (!(A_EE22.value >= 2170 && A_EE22.value <= 2179)) {
				//Add Magical Damage 5% vs Race Option for Enchant slot 2.
				removeOptions(A_EE22);
				A_EE22.options[0] = new Option("(Eden Enchant 2-"+ A_EE22.name.substr(-1) +")",0);
				for(i=0; i<EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length; i++) {
					A_EE22.options[i+1] = new Option(EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1],EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0]);
				}
			}
			break;
		default:
			//Clear weapon 2 slot 2
			removeOptions(A_EE22);
			A_EE22.options[0] = new Option("(Eden Enchant "+ A_EE22.name.substr(-1) +")",0);
		}

		// [Custom Talon Tales - 2018-07-14 - Load URL for Eden Weapon Enchants Slot 2] [NattWara]
		A_EE12.value = StoN2(w.substr(x+3,2));
		A_EE22.value = StoN2(w.substr(x+9,2));

		//Populate option for slot 3 depending on choice of slot 1 and slot 2
		//Weapon 1

		//Clear weapon 1 slot 3
		removeOptions(A_EE13);
		A_EE13.options[0] = new Option("(Eden Enchant "+ A_EE13.name.substr(-1) +")",0);

		if (A_EE11.value != 0 && A_EE12.value != 0) {
			var option1Text = option2Text = "";

			for (i = EDEN_ENCHANTS_WEAPON_FIRST.length - 1; i >= 0; i--) {
				if (EDEN_ENCHANTS_WEAPON_FIRST[i][0] == A_EE11.value) {
					option1Text = EDEN_ENCHANTS_WEAPON_FIRST[i][1];
					break;
				}
			}

			if (A_EE12.value >= 2030 && A_EE12.value <= 2039) {
				for (i = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length - 1; i >= 0; i--) {
					if (EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0] == A_EE12.value) {
						option2Text = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1];
						break;
					}
				}
			}

			if (A_EE12.value >= 2170 && A_EE12.value <= 2179) {
				for (i = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length - 1; i >= 0; i--) {
					if (EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0] == A_EE12.value) {
						option2Text = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1];
						break;
					}
				}
			}

			A_EE13.options[1] = new Option(option1Text,A_EE11.value);
			A_EE13.options[2] = new Option(option2Text,A_EE12.value);
		}

		//Weapon 2

		//Clear weapon 2 slot 3
		removeOptions(A_EE23);
		A_EE23.options[0] = new Option("(Eden Enchant 2-"+ A_EE23.name.substr(-1) +")",0);

		if (A_EE21.value != 0 || A_EE22.value != 0) {
			var option1Text = option2Text = "";

			for (i = EDEN_ENCHANTS_WEAPON_FIRST.length - 1; i >= 0; i--) {
				if (EDEN_ENCHANTS_WEAPON_FIRST[i][0] == A_EE21.value) {
					option1Text = EDEN_ENCHANTS_WEAPON_FIRST[i][1];
					break;
				}
			}

			if (A_EE22.value >= 2030 && A_EE22.value <= 2039) {
				for (i = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL.length - 1; i >= 0; i--) {
					if (EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][0] == A_EE22.value) {
						option2Text = EDEN_ENCHANTS_WEAPON_SECOND_PHYSICAL[i][1];
						break;
					}
				}
			}

			if (A_EE22.value >= 2170 && A_EE22.value <= 2179) {
				for (i = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL.length - 1; i >= 0; i--) {
					if (EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][0] == A_EE22.value) {
						option2Text = EDEN_ENCHANTS_WEAPON_SECOND_MAGICAL[i][1];
						break;
					}
				}
			}

			A_EE23.options[1] = new Option(option1Text,A_EE21.value);
			A_EE23.options[2] = new Option(option2Text,A_EE22.value);
		}

		// [Custom Talon Tales - 2018-07-14 - Load URL for Eden Weapon Enchants Slot 3] [NattWara]
		A_EE13.value = StoN2(w.substr(x+5,2));
		A_EE23.value = StoN2(w.substr(x+11,2));
		x+=12;

		// [Custom Talon Tales - 2018-07-14 - Load URL for Biolab Armor Enchants] [NattWara]
		A_BEH1.value = StoN2(w.substr(x+1,2));
		A_BEH2.value = StoN2(w.substr(x+3,2));
		A_BEA1.value = StoN2(w.substr(x+5,2));
		A_BEA2.value = StoN2(w.substr(x+7,2));
		A_BES1.value = StoN2(w.substr(x+9,2));
		A_BES2.value = StoN2(w.substr(x+11,2));
		A_BEG1.value = StoN2(w.substr(x+13,2));
		A_BEG2.value = StoN2(w.substr(x+15,2));
		A_BEAC11.value = StoN2(w.substr(x+17,2));
		A_BEAC12.value = StoN2(w.substr(x+19,2));
		A_BEAC21.value = StoN2(w.substr(x+21,2));
		A_BEAC22.value = StoN2(w.substr(x+23,2));
		x+=24;

		// [Custom Talon Tales - 2018-07-14 - Load URL for Eden Armor Enchants] [NattWara]
		A_EEH.value = StoN2(w.substr(x+1,2));
		A_EEA1.value = StoN2(w.substr(x+3,2));
		A_EEA2.value = StoN2(w.substr(x+5,2));
		A_EEG1.value = StoN2(w.substr(x+7,2));
		A_EEG2.value = StoN2(w.substr(x+9,2));
		A_EEF1.value = StoN2(w.substr(x+11,2));
		A_EEF2.value = StoN2(w.substr(x+13,2));
		x+=14;

		// [Custom Talon Tales - 2018-07-14 - Load URL for El Dicaste Enchants] [NattWara]
		A_EDG1.value = StoN2(w.substr(x+1,2));
		A_EDG2.value = StoN2(w.substr(x+3,2));
		A_EDG3.value = StoN2(w.substr(x+5,2));
		A_EDF1.value = StoN2(w.substr(x+7,2));
		A_EDF2.value = StoN2(w.substr(x+9,2));
		A_EDF3.value = StoN2(w.substr(x+11,2));
		A_EDAC11.value = StoN2(w.substr(x+13,2));
		A_EDAC12.value = StoN2(w.substr(x+15,2));
		A_EDAC13.value = StoN2(w.substr(x+17,2));
		A_EDAC21.value = StoN2(w.substr(x+19,2));
		A_EDAC22.value = StoN2(w.substr(x+21,2));
		A_EDAC23.value = StoN2(w.substr(x+23,2));
		A_EDLOED11.value = StoN2(w.substr(x+25,2));
		A_EDLOED12.value = StoN2(w.substr(x+27,2));
		A_EDLOED13.value = StoN2(w.substr(x+29,2));
		A_EDLOED21.value = StoN2(w.substr(x+31,2));
		A_EDLOED22.value = StoN2(w.substr(x+33,2));
		A_EDLOED23.value = StoN2(w.substr(x+35,2));
		x+=36;

		// [Custom Talon Tales - 2018-07-14 - Load URL for Mora Enchants] [NattWara]
		A_MORAEA1.value = StoN2(w.substr(x+1,2));
		A_MORAEA2.value = StoN2(w.substr(x+3,2));
		A_MORAEA3.value = StoN2(w.substr(x+5,2));
		A_MORAEG1.value = StoN2(w.substr(x+7,2));
		A_MORAEG2.value = StoN2(w.substr(x+9,2));
		A_MORAEG3.value = StoN2(w.substr(x+11,2));
		A_MORAEAC11.value = StoN2(w.substr(x+13,2));
		A_MORAEAC12.value = StoN2(w.substr(x+15,2));
		A_MORAEAC13.value = StoN2(w.substr(x+17,2));
		A_MORAEAC21.value = StoN2(w.substr(x+19,2));
		A_MORAEAC22.value = StoN2(w.substr(x+21,2));
		A_MORAEAC23.value = StoN2(w.substr(x+23,2));
		x+=24;

		// Retrieve build name
		build_name = w.substr(x + 1, w.length - x);
		document.calcForm.A_SlotName.value = ("" == build_name) ? document.calcForm.A_SlotName.defaultValue : build_name;

		calc();

		StCalc(1);

		ActiveSkillSetPlus();
		x = BackupX;
		A_ActiveSkill.value = StoN2(w.substr(x+1,2));

		ClickActiveSkill();
		A_ActiveSkillLV.value = StoN2(w.substr(x+3,1));

		if(n_A_ActiveSkill==66 || n_A_ActiveSkill==326 || n_A_ActiveSkill==131 || n_A_ActiveSkill==88 || n_A_ActiveSkill==197 || n_A_ActiveSkill==394 || n_A_ActiveSkill==395 || n_A_ActiveSkill==405 || n_A_ActiveSkill==429)
			SkillSubNum.value = StoN2(w.substr(x+4,3));

		B_Enemy.value = StoN2(w.substr(x+7,2));

		calc();
	}
}}

JobName =
["Novice", //0
"Swordsman", //1
"Thief", //2
"Acolyte", //3
"Archer", //4
"Magician", //5
"Merchant", //6
"Knight", //7
"Assassin", //8
"Priest", //9
"Hunter", //10
"Wizard", //11
"Blacksmith", //12
"Crusader", //13
"Rogue", //14
"Monk", //15
"Bard", //16
"Dancer", //17
"Sage", //18
"Alchemist", //19
"Super Novice", //20
"Lord Knight", //21
"Assassin Cross", //22
"High Priest", //23
"Sniper", //24
"High Wizard", //25
"Whitesmith", //26
"Paladin", //27
"Stalker", //28
"Champion", //29
"Clown", //30
"Gypsy", //31
"Professor", //32
"Creator", //33
"High Novice", //34
"High Swordsman", //35
"High Thief", //36
"High Acolyte", //37
"High Archer", //38
"High Magician", //39
"High Merchant", //40
"Taekwon Kid", //41
"Star Gladiator", //42
"Soul Linker", //43
"Ninja", //44
"Gunslinger"]; //45

for (i=0;i<=45;i++)
	document.calcForm.A_JOB.options[i] = new Option(JobName[i],i);

SpeedPotName = ["None","Concentration Potion","Awakening Potion","Berserk Potion"];

document.calcForm.A_SpeedPOT.options[0] = new Option(SpeedPotName[0],0);
document.calcForm.A_SpeedPOT.options[1] = new Option(SpeedPotName[1],1);

for (i=0;i<=23;i++)
	document.calcForm.A_Arrow.options[i] = new Option(ArrowOBJ[i][2],i);

EnName =["Neutral","Water","Earth","Fire","Wind","Poison","Holy","Shadow","Ghost","Undead"];
for (i=0;i<=9;i++)
	document.calcForm.A_Weapon_zokusei.options[i] = new Option(EnName[i],i);

CardShort =[
["Card Shortcuts",0,0,0,0], // # 0
["Remove All Cards",10000,0], // # 1
["Remove Weapon Cards",0,0,0,0], // # 2
["+60%[TTT]",323,323,323,0], // # 3
["+40%, +25% ASPD [DTT]",42,323,323,0], // # 4
["+20%, +50% ASPD [DDT]",42,42,323,0], // # 5
["+60%, +25% ASPD [DTTT]",42,323,323,323], // # 6
["+40%, +50% ASPD [DDTT]",42,42,323,323], // # 7
["+65 ATK, +50% ASPD [DDBS]",42,42,45,255], // # 8
["+130 ATK, +25% ASPD [DBSS]",42,45,255,255], // # 9
["+50% BB dmg [SGSG]",464,464,0,0], // # 10
["+75% BB dmg [SGSGSG]",464,464,464,0], // # 11
["+40%[2 Race Card]",1,1,0,0], // # 12
["+60%[3 Race Card]",1,1,1,0], // # 13
["+80%[4 Race Card]",1,1,1,1], // # 14
["+61%[2 Race/1 Size Cards]",1,1,3,0], // # 15
["+68%[2 Race/1 Element Cards]",1,1,2,0], // # 16
["+84%[3 Race/1 Size Cards]",1,1,1,3], // # 17
["+96%[2 Race/2 Element Cards]",1,1,2,2], // # 18
["+110%[2 AK/2 Race Cards]",31,31,1,1], // # 19
["+110%[3 AK/1 Race Cards]",31,31,31,1], // # 20
["+110%[3 AK/1 Element Cards]",31,31,31,2], // # 21
["2 Size Cards",3,3,0,0], // # 22
["3 Size Cards",3,3,3,0], // # 23
["4 Size Cards",3,3,3,3], // # 24
["Elemental + Star Crumb",0,106,0,0], // # 25
["Elemental + 2 Star Crumbs",0,106,106,0], // # 26
["3 Star Crumbs",106,106,106,0], // # 27
["+40 ATK[2 Andre Cards]",11,11,0,0], // # 28
["+60 ATK[3 Andre Cards]",11,11,11,0], // # 29
["+80 ATK[4 Andre Cards]",11,11,11,11], // # 30
["+60 ATK[2 Zipper Bear Cards]",326,326,0,0], // # 31
["+90 ATK[3 Zipper Bear Cards]",326,326,326,0], // # 32
["+120 ATK[4 Zipper Bear Cards]",326,326,326,326], // # 33
["2 Sold. Skeleton Cards",41,41,0,0], // # 34
["3 Sold. Skeleton Cards",41,41,41,0], // # 35
["4 Sold. Skeleton Cards",41,41,41,41], // # 36
["+40 HIT[2 Mummy Cards]",40,40,0,0], // # 37
["+60 HIT[3 Mummy Cards]",40,40,40,0], // # 38
["+80 HIT[4 Mummy Cards]",40,40,40,40], // # 39
["+60%[2 Orc Lady Cards]",252,252,0,0], // # 40
["+92%[2 Orc Lady/1 Hydra Cards]",252,252,13,0], // # 41
["+128%[3 Orc Lady/1 Hydra Cards]",252,252,252,13], // # 42
["+20%[2 Archer Skeleton Cards]",107,107,0,0], // # 43
["+30%[3 Archer Skeleton Cards]",107,107,107,0], // # 44
["+40%[4 Archer Skeleton Cards]",107,107,107,107], // # 45
["2 Fabre Cards",4,4,0,0], // # 46
["3 Fabre Cards",4,4,4,0], // # 47
["4 Fabre Cards",4,4,4,4], // # 48
["2 Drops Cards",5,5,0,0], // # 49
["3 Drops Cards",5,5,5,0], // # 50
["4 Drops Cards",5,5,5,5], // # 51
["+50%[2 Abysmal Knight Cards]",31,31,0,0], // # 52
["+75%[3 Abysmal Knight Cards]",31,31,31,0], // # 53
["+100%[4 Abysmal Knight Cards]",31,31,31,31], // # 54
["2 Crit Dmg+10%,Crit+7 Cards",156,156,0,0], // # 55
["3 Crit Dmg+10%,Crit+7 Cards",156,156,156,0], // # 56
["4 Crit Dmg+10%,Crit+7 Cards",156,156,156,156], // # 57
["Swordsman Set",10000,223,347,0,317,0,362,354,0,0], // # 58
["Thief Set",10000,233,0,0,0,295,391,395,260,0], // # 59
["Aco Set",10000,253,383,307,301,0,0,270,0,0], // # 60
["Archer Set",10000,279,0,0,224,340,351,531,0,0], // # 61
["Mage Set",10000,0,337,358,220,346,379,350,0,0], // # 62
["Merchant Set",10000,326,376,0,281,0,388,216,0,0], // # 63
["Crusader Set",10000,0,347,0,190,0,362,354,0,0], // # 64
["Rogue Set",10000,0,113,0,0,295,391,260,413,0], // # 65
["Monk Set",10000,253,383,0,181,0,0,270,0,0], // # 66
["Bard/Dancer Set",10000,279,0,0,224,340,408,230,0,0], // # 67
["Sage Set",10000,0,337,0,193,346,379,350,0,0], // # 68
["Alchemist Set",10000,326,175,0,281,0,388,104,0,0], // # 69
["+75% ASPD [DDD]",42,42,42,0], // # 70
["12% All-Size Dmg. Reduc. [3Drac]",47,47,47,0], // # 71
["16% All-Size Dmg. Reduc. [4Drac]",47,47,47,47], // # 72
["Test (for now)",0,0,0,0], // # 73
];
for(i=0;i<=72;i++)
	document.calcForm.A_cardshort.options[i] = new Option(CardShort[i][0],i);

//custom Talon Tales extra enchants
//original
//var HSEname = ["STR","AGI","VIT","INT","DEX","LUK"];
//new:
/*
var HSEname = ["STR","AGI","VIT","INT","DEX","LUK","DEF","MDEF","CRIT","ASPD","FLEE","HIT"];
document.calcForm.A_HSE.options[0] = new Option("(Hidden Slot Enchant, Armor)",0);
var iHSE=1;
for(i=0;i<=5;i++){
	for(var j=1;j<=3;j++){
		document.calcForm.A_HSE.options[iHSE] = new Option(HSEname[i] + "+"+ j,(i * 10) + j);
		iHSE++;
	}
}
//custom Talon Tales extra enchants
//DEF,MDEF,CRIT
for(i=6;i<=8;i++){
	for(var j=1;j<=3;j++){
		document.calcForm.A_HSE.options[iHSE] = new Option(HSEname[i] + "+"+ (j+1),(i * 10) + j);
		iHSE++;
	}
}
//ASPD
for(var j=1;j<=3;j++){
	document.calcForm.A_HSE.options[iHSE] = new Option(HSEname[9] + "+"+ j +"%",(9 * 10) + j);
	iHSE++;
}
//FLEE
for(var j=1;j<=3;j++){
	document.calcForm.A_HSE.options[iHSE] = new Option(HSEname[10] + "+"+ j*2,(10 * 10) + j);
	iHSE++;
}
//HIT
for(var j=1;j<=3;j++){
	document.calcForm.A_HSE.options[iHSE] = new Option(HSEname[11] + "+"+ j*4,(11 * 10) + j);
	iHSE++;
}
*/
//end - custom Talon Tales extra enchants


//Enchant Headgear thing
var HSEname = ["STR","AGI","VIT","INT","DEX","LUK","DEF","MDEF","CRIT","ASPD","FLEE","HIT"];
document.calcForm.A_HSE_HEAD1.options[0] = new Option("(Hidden Slot Enchant, Headgear)",0);
var iHSE=1;
for(i=0;i<=5;i++){
	for(var j=1;j<=3;j++){
		document.calcForm.A_HSE_HEAD1.options[iHSE] = new Option(HSEname[i] + "+"+ j,(i * 10) + j);
		iHSE++;
	}
}

n_A_PassSkill2 = new Array();
for(i=0;i<=15;i++)
	n_A_PassSkill2[i] = 0;

n_A_PassSkill3 = new Array();
for(i=0;i<=46;i++)
	n_A_PassSkill3[i] = 0;

bragi_bonus = 0;
apple_bonus = 0;
sunset_bonus = 0;
humming_bonus = 0;
fortune_bonus = 0;
service_bonus = 0;
whistle_pd_bonus = 0;
whistle_flee_bonus = 0;
fortune_extra_bonus = 0;

n_A_PassSkill5 = new Array();
for(i=0;i<=5;i++)
	n_A_PassSkill5[i] = 0;

n_A_PassSkill6 = new Array();
for(i=0;i<=6;i++)
	n_A_PassSkill6[i] = 0;

n_A_PassSkill7 = new Array();
for(i=0;i<=15;i++)
	n_A_PassSkill7[i] = 0;

n_A_PassSkill8 = new Array();
for(i=0;i<=32;i++)
	n_A_PassSkill8[i] = 0;

n_A_PassSkill8[3] = 7; //[Custom Talon Tales - 6/4/2018 - Fixed the default value for BaseEXP to 8x] [Kato]
n_A_PassSkill8[7] = 7; //[Custom Talon Tales - 6/4/2018 - Fixed the default value for JobEXP to 8x] [Kato]

//updated def reduction when mobbed [Loa] 2018-07-24
n_A_PassSkill8[33] = 0;
n_A_PassSkill8[34] = 0;

eden_rough_crystal_buff = 0;
eden_purified_crystal_buff = 0;
eden_high_crystal_buff = 0;

eclage_food = 0;
abrasive_food = 0;
bobo_boba_cocktail = 0;
sting_slap_cocktail = 0;
venatu_beep_cocktail = 0;
chepet_match_cocktail = 0;
dullahan_ale_cocktail = 0;
sleeper_dream_cocktail = 0;
sippin_galapago_cocktail = 0;
old_dracula_mix_cocktail = 0;
spammers_heaven_cocktail = 0;
mobster_paradise_cocktail = 0;
wolfchev_nightcap_cocktail = 0;
seductive_bathory_cocktail = 0;
myst_case_suprise_cocktail = 0;
drip_of_yggdrasil_cocktail = 0;
moscow_headless_mule_cocktail = 0;
blossoming_geographer_cocktail = 0;

if (0 == Taijin)
{
	document.calcForm.B_ENSKSW.checked = 0;
	document.calcForm.monster_stats_check.checked = 0;
}

document.calcForm.A2_SKILLSW.checked = 0;

n_A_PassSkill9 = new Array();
for(i=0;i<=55;i++)
	n_A_PassSkill9[i] = 0;
//custom Talon Tales SQI-Bonus calculation
SQI_Bonus_Effect = new Array();
for(i=0;i<4;i++){
	SQI_Bonus_Effect[i] = 0;
}
n_A_IJYOU = new Array();
for(i=0;i<=3;i++)
	n_A_IJYOU[i] = 0;

n_B_IJYOU = new Array();
for(i=0;i<=24;i++)
	n_B_IJYOU[i] = 0;
mvp_strip_vit_bonus = 0;
eska_mdef_reduction = 0;

n_B_KYOUKA = new Array();
for(i=0;i<=10;i++)
	n_B_KYOUKA[i] = 0;

n_A_Equip = new Array();
for(i=0;i<=20;i++)
	n_A_Equip[i] = 0;
n_A_card = new Array();
for(i=0;i<=25;i++)
	n_A_card[i] = 0;

tPlusTaiseiSyokia();

for(i=0;i<ITEM_SP_TIME_OBJ.length;i++){
	if(ITEM_SP_TIME_OBJ[i][3] == 1){
		var str = "<Font size='2'><B>[Special Effect: [" + ITEM_SP_TIME_OBJ[i][2] +"] can be activated under 'Additional Effects' at the bottom of the page!]</B></Font>";
		if(ItemOBJ[ITEM_SP_TIME_OBJ[i][4]][10] == 0)
			ItemOBJ[ITEM_SP_TIME_OBJ[i][4]][10] = str;
		else
			ItemOBJ[ITEM_SP_TIME_OBJ[i][4]][10] += "<BR>"+ str;
	}
}

for(i=0;i<ITEM_SP_TIME_OBJ.length;i++){
	if(ITEM_SP_TIME_OBJ[i][3] == 2){
		var str = "<Font size='2'><B>[Special Effect: [" + ITEM_SP_TIME_OBJ[i][2] +"] can be activated under 'Additional Effects' at the bottom of the page!]</B></Font>";
		if(cardOBJ[ITEM_SP_TIME_OBJ[i][4]][3] == 0)
			cardOBJ[ITEM_SP_TIME_OBJ[i][4]][3] = str;
		else
			cardOBJ[ITEM_SP_TIME_OBJ[i][4]][3] += "<BR>"+ str;
	}
}

//[Custom Talon Tales - 2018-06-03 - Populate combos in index] [Kato]
tRO_PopulateCombos();

document.calcForm.A_JOB.value = 0;
ClickJob(0);
if(Taijin==0)
	sort_monsters_db();
StCalc();
calc();

LoadCookie3();
//LoadCookieConf();
//LoadCookieChangelogDisplay();
URLIN();

Click_Skill3SW();
Click_Skill4SW();
Click_Skill5SW();
Click_Skill6SW();
Click_Skill7SW();
Click_Skill8SW();
Click_EnemyKyoukaSW();
Click_IjyouSW();
Click_A2();
//custom Talon Tales - Skill9SW deactivated
Click_Skill9SW();
//custom Talon Tales SQI-Bonus calculation
Click_SQI_Bonus_SW();
