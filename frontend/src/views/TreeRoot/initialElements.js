export const treeRootId = 1;
export const initialTree = {
	1: {
		id: '1',
		infomation: {
			name: 'Nguyen Van A',
			birthDay: '01/01/1950',
			address: 'Hanoi',
			gender: 0
		},
		type: 'input',
		children: ['2', '3', '4'],
	
	},
	2: {
		id: '2',
		infomation: {
			name: 'Nguyen Thi B',
			birthDay: '01/01/1975',
			address: 'Hanoi',
			gender: 1
		},
		children: ['5', '6', '7'],
	
	},
	3: {
		id: '3',
		infomation: {
			name: 'Nguyen Van C',
			birthDay: '01/01/1980',
			address: 'Hanoi',
			gender: 0
		},
		children: ['8', '9', '10'],
		
	},
	4: {
		id: '4',
		infomation: {
			name: 'Nguyen Van D',
			birthDay: '01/01/1985',
			address: 'Hanoi',
			gender: 0
		},
		children: [ '12'],
		spouses: ['13']
	},
	5: {
		id: '5',
		infomation: {
			name: 'Nguyen Van E',
			birthDay: '01/01/2000',
			address: 'Hanoi',
			gender: 0
		},
		children: ['20', '21'],
		spouses: ['14']
	},
	6: {
		id: '6',
		infomation: {
			name: 'Nguyen Thi F',
			birthDay: '01/01/2002',
			address: 'Hanoi',
			gender: 1
		},
		children: ['22', '23'],
		spouses: ['15']
	},
	7: {
		id: '7',
		infomation: {
			name: 'Nguyen Van G',
			birthDay: '01/01/2005',
			address: 'Hanoi',
			gender: 0
		},
		children: ['24', '25'],
		spouses: ['16']
	},
	8: {
		id: '8',
		infomation: {
			name: 'Nguyen Thi H',
			birthDay: '01/01/2008',
			address: 'Hanoi',
			gender: 1
		},
		children: ['26', '27'],
		spouses: ['17']
	},
	9: {
		id: '9',
		infomation: {
			name: 'Nguyen Van I',
			birthDay: '01/01/2010',
			address: 'Hanoi',
			gender: 0
		},
		children: ['28', '29'],
		spouses: ['18']
	},
	10: {
		id: '10',
		infomation: {
			name: 'Nguyen Thi J',
			birthDay: '01/01/2012',
			address: 'Hanoi',
			gender: 1
		},
		children: ['30', '31'],
		spouses: ['19']
	},

	12: {
		id: '12',
		infomation: {
			name: 'Nguyen Thi L',
			birthDay: '01/01/2017',
			address: 'Hanoi',
			gender: 1
		}
	},
	13: {
		id: '13',
		infomation: {
			name: 'Hoang Thi M',
			birthDay: '01/01/1985',
			address: 'Hanoi',
			gender: 1
		},
		isSpouse: true
	},
	14: {
		id: '14',
		infomation: {
			name: 'Le Thi N',
			birthDay: '01/01/2000',
			address: 'Hanoi',
			gender: 1
		},
		isSpouse: true
	},
	15: {
		id: '15',
		infomation: {
			name: 'Tran Van O',
			birthDay: '01/01/1998',
			address: 'Hanoi',
			gender: 0
		},
		isSpouse: true
	},
	16: {
		id: '16',
		infomation: {
			name: 'Pham Thi P',
			birthDay: '01/01/2005',
			address: 'Hanoi',
			gender: 1
		},
		isSpouse: true
	},
	17: {
		id: '17',
		infomation: {
			name: 'Nguyen Van Q',
			birthDay: '01/01/2008',
			address: 'Hanoi',
			gender: 0
		},
		isSpouse: true
	},
	18: {
		id: '18',
		infomation: {
			name: 'Tran Thi R',
			birthDay: '01/01/2010',
			address: 'Hanoi',
			gender: 1
		},
		isSpouse: true
	},
	19: {
		id: '19',
		infomation: {
			name: 'Nguyen Van S',
			birthDay: '01/01/2012',
			address: 'Hanoi',
			gender: 0
		},
		isSpouse: true
	},
	20: {
		id: '20',
		infomation: {
			name: 'Nguyen Van T',
			birthDay: '01/01/2025',
			address: 'Hanoi',
			gender: 0
		}
	},
	21: {
		id: '21',
		infomation: {
			name: 'Nguyen Thi U',
			birthDay: '01/01/2027',
			address: 'Hanoi',
			gender: 1
		}
	},
	22: {
		id: '22',
		infomation: {
			name: 'Nguyen Van V',
			birthDay: '01/01/2028',
			address: 'Hanoi',
			gender: 0
		}
	},
	23: {
		id: '23',
		infomation: {
			name: 'Nguyen Thi W',
			birthDay: '01/01/2029',
			address: 'Hanoi',
			gender: 1
		}
	},
	24: {
		id: '24',
		infomation: {
			name: 'Nguyen Van X',
			birthDay: '01/01/2030',
			address: 'Hanoi',
			gender: 0
		}
	},
	25: {
		id: '25',
		infomation: {
			name: 'Nguyen Thi Y',
			birthDay: '01/01/2032',
			address: 'Hanoi',
			gender: 1
		}
	},
	26: {
		id: '26',
		infomation: {
			name: 'Nguyen Van Z',
			birthDay: '01/01/2033',
			address: 'Hanoi',
			gender: 0
		}
	},
	27: {
		id: '27',
		infomation: {
			name: 'Nguyen Thi AA',
			birthDay: '01/01/2034',
			address: 'Hanoi',
			gender: 1
		}
	},
	28: {
		id: '28',
		infomation: {
			name: 'Nguyen Van AB',
			birthDay: '01/01/2035',
			address: 'Hanoi',
			gender: 0
		}
	},
	29: {
		id: '29',
		infomation: {
			name: 'Nguyen Thi AC',
			birthDay: '01/01/2036',
			address: 'Hanoi',
			gender: 1
		}
	},
	30: {
		id: '30',
		infomation: {
			name: 'Nguyen Van AD',
			birthDay: '01/01/2037',
			address: 'Hanoi',
			gender: 0
		}
	},
	31: {
		id: '31',
		infomation: {
			name: 'Nguyen Thi AE',
			birthDay: '01/01/2038',
			address: 'Hanoi',
			gender: 1
		}
	}
}

