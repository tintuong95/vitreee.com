export const treeRootId = 1;
export const initialTree = {
	1: {
		id: "1",
		info: {
			id: 1,
			accountId: 1,
			familyTreeId: 1,
			fullName: 'Nguyen Anh V',
			phone: '0325453478',
			email: 'tintuong95@gmail.com',
			address: 'Phu Thu Tay Hoa Phu Yen',
			avatar: 'sdafdsaf',
			description:
				'Kích thước: Ngang 120cm x Sâu 60cm x Cao 196cm Chất liệu: MDF phủ Melamine, chống ẩm.',
			birth_date: '1995-10-10',
			dead_date: '1995-10-10',
			gender: 1,
			type: 1,
			createdAt: '2024-12-31T06:06:17.116Z',
			updatedAt: '2024-12-31T06:06:17.116Z',
			deletedAt: null,
			spouses: ['2']
		},
		spouses: ['2'],    children: [ '3'],

		type: 'input'
	},
	2: {
		id: "2",
		info: {
			id: 2,
			accountId: 1,
			familyTreeId: 1,
			fullName: 'Nguyen Anh A',
			phone: '0325453478',
			email: 'tintuong95@gmail.com',
			address: 'Phu Thu Tay Hoa Phu Yen',
			avatar: 'sdafdsaf',
			description:
				'Kích thước: Ngang 120cm x Sâu 60cm x Cao 196cm Chất liệu: MDF phủ Melamine, chống ẩm.',
			birth_date: '1995-10-10',
			dead_date: '1995-10-10',
			gender: 1,
			type: 0,
			createdAt: '2024-12-31T06:10:43.909Z',
			updatedAt: '2024-12-31T06:10:43.909Z',
			deletedAt: null,
			isSpouse: true
		},
		isSpouse: true
	},
  3: { id: '3', name: 'child2' },
};
