/**
 * Design Tokens
 * Autogenerated from tokens.json.
 * DO NOT EDIT!
 */

export declare const tokens: {
	readonly breakpoint: {
		readonly desktop: '980px';
		readonly leftCol: '1140px';
		readonly mobile: '320px';
		readonly mobileLandscape: '480px';
		readonly mobileMedium: '375px';
		readonly phablet: '660px';
		readonly tablet: '740px';
		readonly wide: '1300px';
	};
	readonly height: {
		readonly ctaMedium: '44px';
		readonly ctaSmall: '36px';
		readonly ctaXSmall: '24px';
		readonly iconMedium: '30px';
		readonly iconSmall: '26px';
		readonly iconXSmall: '20px';
		readonly inputMedium: '44px';
		readonly inputXSmall: '24px';
	};
	readonly palette: {
		readonly brand: {
			readonly '100': '#001536';
			readonly '300': '#041F4A';
			readonly '400': '#052962';
			readonly '500': '#0077B6';
			readonly '600': '#506991';
			readonly '800': '#C1D8FC';
		};
		readonly brandAlt: {
			readonly '200': '#F3C100';
			readonly '300': '#FFD900';
			readonly '400': '#FFE500';
		};
		readonly culture: {
			readonly '50': '#2B2625';
			readonly '100': '#3E3323';
			readonly '200': '#574835';
			readonly '300': '#6B5840';
			/** @deprecated Use palette.culture.400 */
			readonly '350': '#866D50';
			readonly '400': '#866D50';
			readonly '450': '#A1845C';
			readonly '500': '#EACCA0';
			readonly '600': '#E7D4B9';
			readonly '700': '#EFE8DD';
			readonly '800': '#FBF6EF';
		};
		readonly error: {
			readonly '400': '#C70000';
			readonly '500': '#FF9081';
		};
		readonly focus: {
			readonly '400': '#0077B6';
		};
		readonly labs: {
			readonly '200': '#0C7A73';
			readonly '300': '#65A897';
			readonly '400': '#69D1CA';
		};
		readonly lifestyle: {
			readonly '100': '#510043';
			readonly '200': '#650054';
			readonly '300': '#7D0068';
			readonly '400': '#BB3B80';
			readonly '450': '#F37ABC';
			readonly '500': '#FFABDB';
			readonly '600': '#FEC8D3';
			readonly '800': '#FEEEF7';
		};
		readonly neutral: {
			readonly '0': '#000000';
			readonly '7': '#121212';
			readonly '10': '#1A1A1A';
			readonly '20': '#333333';
			readonly '38': '#606060';
			readonly '46': '#707070';
			readonly '60': '#999999';
			readonly '86': '#DCDCDC';
			readonly '93': '#EDEDED';
			readonly '97': '#F6F6F6';
			readonly '100': '#FFFFFF';
		};
		readonly news: {
			readonly '100': '#660505';
			readonly '200': '#8B0000';
			readonly '300': '#AB0613';
			readonly '400': '#C70000';
			readonly '500': '#FF5943';
			readonly '550': '#FF9081';
			readonly '600': '#FFBAC8';
			readonly '800': '#FFF4F2';
		};
		readonly opinion: {
			readonly '100': '#672005';
			readonly '200': '#8D2700';
			/** @deprecated Use palette.opinion.400 */
			readonly '300': '#C74600';
			readonly '400': '#C74600';
			readonly '450': '#E05E00';
			readonly '500': '#FF7F0F';
			readonly '550': '#FF9941';
			readonly '600': '#F9B376';
			readonly '800': '#FEF9F5';
		};
		readonly specialReport: {
			readonly '100': '#222527';
			readonly '200': '#303538';
			readonly '300': '#3F464A';
			readonly '400': '#595C5F';
			readonly '450': '#9DA0A2';
			readonly '500': '#ABC2C9';
			readonly '700': '#E4E5E8';
			readonly '800': '#EFF1F2';
		};
		readonly specialReportAlt: {
			readonly '100': '#2B2B2A';
			readonly '200': '#B9300A';
			readonly '300': '#FF663D';
			readonly '700': '#EBE6E1';
			readonly '800': '#F5F0EB';
		};
		readonly sport: {
			readonly '100': '#003C60';
			readonly '200': '#004E7C';
			readonly '300': '#005689';
			readonly '400': '#0077B6';
			readonly '500': '#00B2FF';
			readonly '600': '#90DCFF';
			readonly '800': '#F1F8FC';
		};
		readonly success: {
			readonly '400': '#22874D';
			readonly '500': '#58D08B';
		};
	};
	readonly size: {
		readonly icon: {
			readonly medium: '30px';
			readonly small: '26px';
			readonly xSmall: '20px';
		};
		readonly medium: '44px';
		readonly small: '36px';
		readonly xSmall: '24px';
	};
	readonly space: {
		readonly '0': '2px';
		readonly '1': '4px';
		readonly '2': '8px';
		readonly '3': '12px';
		readonly '4': '16px';
		readonly '5': '20px';
		readonly '6': '24px';
		readonly '8': '32px';
		readonly '9': '36px';
		readonly '10': '40px';
		readonly '12': '48px';
		readonly '14': '56px';
		readonly '16': '64px';
		readonly '18': '72px';
		readonly '24': '96px';
	};
	readonly typography: {
		readonly body: {
			readonly medium: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.4;
				readonly fontWeight: 400;
			};
			readonly small: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.4;
				readonly fontWeight: 400;
			};
			readonly xSmall: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.4;
				readonly fontWeight: 400;
			};
		};
		readonly fontFamily: {
			readonly body: readonly [
				'GuardianTextEgyptian',
				'Guardian Text Egyptian Web',
				'Georgia',
				'serif',
			];
			readonly headline: readonly [
				'GH Guardian Headline',
				'Guardian Egyptian Web',
				'Georgia',
				'serif',
			];
			readonly textSans: readonly [
				'GuardianTextSans',
				'Guardian Text Sans Web',
				'Helvetica Neue',
				'Helvetica',
				'Arial',
				'Lucida Grande',
				'sans-serif',
			];
			readonly titlepiece: readonly [
				'GT Guardian Titlepiece',
				'Georgia',
				'serif',
			];
		};
		readonly fontSize: {
			readonly '12': '12px';
			readonly '14': '14px';
			readonly '15': '15px';
			readonly '17': '17px';
			readonly '20': '20px';
			readonly '24': '24px';
			readonly '28': '28px';
			readonly '34': '34px';
			readonly '42': '42px';
			readonly '50': '50px';
			readonly '70': '70px';
		};
		readonly fontWeight: {
			readonly bold: 700;
			readonly light: 300;
			readonly medium: 500;
			readonly regular: 400;
		};
		readonly headline: {
			readonly large: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
			readonly medium: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
			readonly small: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
			readonly xLarge: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
			readonly xSmall: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
			readonly xxSmall: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
			readonly xxxSmall: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
			};
		};
		readonly lineHeight: {
			readonly loose: 1.4;
			readonly regular: 1.3;
			readonly tight: 1.15;
		};
		readonly presets: {
			readonly headlineBold14: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold17: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold20: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold24: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold28: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold34: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold42: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold50: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineBold70: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight14: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight17: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight20: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight24: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight28: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight34: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight42: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight50: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLight70: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'normal';
			};
			readonly headlineLightItalic14: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic17: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic20: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic24: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic28: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic34: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic42: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic50: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineLightItalic70: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 300;
				readonly fontStyle: 'italic';
			};
			readonly headlineMedium14: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium17: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium20: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium24: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium28: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium34: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium42: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium50: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMedium70: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'normal';
			};
			readonly headlineMediumItalic14: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic17: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic20: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic24: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic28: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic34: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic42: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic50: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 500;
				readonly fontStyle: 'italic';
			};
			readonly headlineMediumItalic70: {
				readonly fontFamily: readonly [
					'GH Guardian Headline',
					'Guardian Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'italic';
			};
			readonly textEgyptian14: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textEgyptian15: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textEgyptian17: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textEgyptianBold14: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textEgyptianBold15: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textEgyptianBold17: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textEgyptianBoldItalic14: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'italic';
			};
			readonly textEgyptianBoldItalic15: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'italic';
			};
			readonly textEgyptianBoldItalic17: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'italic';
			};
			readonly textEgyptianItalic14: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textEgyptianItalic15: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textEgyptianItalic17: {
				readonly fontFamily: readonly [
					'GuardianTextEgyptian',
					'Guardian Text Egyptian Web',
					'Georgia',
					'serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSans12: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '12px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans14: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans15: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans17: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans20: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans24: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans28: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSans34: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold12: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '12px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold14: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold15: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold17: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold20: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold24: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold28: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansBold34: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly textSansItalic12: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '12px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic14: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic15: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic17: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic20: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic24: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic28: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly textSansItalic34: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
				readonly fontStyle: 'italic';
			};
			readonly titlepiece42: {
				readonly fontFamily: readonly [
					'GT Guardian Titlepiece',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly titlepiece50: {
				readonly fontFamily: readonly [
					'GT Guardian Titlepiece',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
			readonly titlepiece70: {
				readonly fontFamily: readonly [
					'GT Guardian Titlepiece',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
				readonly fontStyle: 'normal';
			};
		};
		readonly textDecorationThicknessForFontSize: {
			readonly '12': '2px';
			readonly '14': '2px';
			readonly '15': '2px';
			readonly '17': '2px';
			readonly '20': '3px';
			readonly '24': '3px';
			readonly '28': '3px';
			readonly '34': '4px';
			readonly '42': '5px';
			readonly '50': '6px';
			readonly '70': '6px';
		};
		readonly textSans: {
			readonly large: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '20px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly medium: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '17px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly small: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '15px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly xLarge: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '24px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly xSmall: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '14px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly xxLarge: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '28px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly xxSmall: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '12px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
			readonly xxxLarge: {
				readonly fontFamily: readonly [
					'GuardianTextSans',
					'Guardian Text Sans Web',
					'Helvetica Neue',
					'Helvetica',
					'Arial',
					'Lucida Grande',
					'sans-serif',
				];
				readonly fontSize: '34px';
				readonly lineHeight: 1.3;
				readonly fontWeight: 400;
			};
		};
		readonly titlepiece: {
			readonly large: {
				readonly fontFamily: readonly [
					'GT Guardian Titlepiece',
					'Georgia',
					'serif',
				];
				readonly fontSize: '70px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
			};
			readonly medium: {
				readonly fontFamily: readonly [
					'GT Guardian Titlepiece',
					'Georgia',
					'serif',
				];
				readonly fontSize: '50px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
			};
			readonly small: {
				readonly fontFamily: readonly [
					'GT Guardian Titlepiece',
					'Georgia',
					'serif',
				];
				readonly fontSize: '42px';
				readonly lineHeight: 1.15;
				readonly fontWeight: 700;
			};
		};
	};
	readonly width: {
		readonly ctaMedium: '44px';
		readonly ctaSmall: '36px';
		readonly ctaXSmall: '24px';
		readonly iconMedium: '30px';
		readonly iconSmall: '26px';
		readonly iconXSmall: '20px';
		readonly inputXSmall: '24px';
	};
};
