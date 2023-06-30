import mock from '@/@fake-db/mock'
import { genId, paginateArray } from '@/@fake-db/utils'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar3 from '@images/avatars/avatar-3.png'

const users = [
  {
    id: 1,
    fullName: 'Galen Slixby',
    company: 'Administrador',
    role: 'DR. Jose Angel',
    country: 'El Salvador',
    contact: '(479) 232-9151',
    email: 'gslixby0@abc.net.au',
    currentPlan: '15/06/2023',
    status: 'Disponible',
    billing: 'Asma',
    avatar: '',
  },
  {
    id: 2,
    fullName: 'Halsey Redmore',
    company: 'Super Administrador',
    role: 'DR. Melvyn Martinez',
    country: 'Albania',
    contact: '(472) 607-9137',
    email: 'hredmore1@imgur.com',
    currentPlan: '15/06/2023',
    status: 'En Consulta',
    avatar: avatar1,
    billing: 'Deficit de Atencion',
  },
  {
    id: 3,
    fullName: 'Marjory Sicely',
    company: 'Doctor@s',
    role: 'Dra. Dora Lara',
    country: 'Russia',
    contact: '(321) 264-4599',
    email: 'msicely2@who.int',
    currentPlan: '15/06/2023',
    status: 'Ausente',
    avatar: avatar1,
    billing: 'Diabetes',
  },
  {
    id: 4,
    fullName: 'Cyrill Risby',
    company: 'Super Administrador',
    role: 'Dr. Kevin Martinez',
    country: 'China',
    contact: '(923) 690-6806',
    email: 'crisby3@wordpress.com',
    currentPlan: '15/06/2023',
    status: 'Disponible',
    avatar: avatar3,
    billing: 'Neumonia',
  },
  {
    id: 5,
    fullName: 'Maggy Hurran',
    company: 'Doctor',
    role: 'Dr. Osleiky Garcia',
    country: 'Pakistan',
    contact: '(669) 914-1078',
    email: 'mhurran4@yahoo.co.jp',
    currentPlan: '15/06/2023',
    status: 'En Consulta',
    avatar: avatar1,
    billing: 'Influenza',
  },
]


// 👉  return users
// eslint-disable-next-line sonarjs/cognitive-complexity
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', role = null, plan = null, status = null, options = {} } = config.params ?? {}
  const { sortBy = '', itemsPerPage = 10, page = 1 } = options
  const queryLower = q.toLowerCase()

  // filter users
  let filteredUsers = users.filter(user => ((user.fullName.toLowerCase().includes(queryLower) || user.email.toLowerCase().includes(queryLower)) && user.role === (role || user.role) && user.currentPlan === (plan || user.currentPlan) && user.status === (status || user.status))).reverse()

  // sort users
  const sort = JSON.parse(JSON.stringify(sortBy))
  if (sort.length) {
    if (sort[0]?.key === 'user') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.fullName.localeCompare(b.fullName)
        else
          return b.fullName.localeCompare(a.fullName)
      })
    }
    if (sort[0]?.key === 'billing') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.billing.localeCompare(b.billing)
        else
          return b.billing.localeCompare(a.billing)
      })
    }
    if (sort[0]?.key === 'role') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.role.localeCompare(b.role)
        else
          return b.role.localeCompare(a.role)
      })
    }
    if (sort[0]?.key === 'plan') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.currentPlan.localeCompare(b.currentPlan)
        else
          return b.currentPlan.localeCompare(a.currentPlan)
      })
    }
    if (sort[0]?.key === 'status') {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (sort[0]?.order === 'asc')
          return a.status.localeCompare(b.status)
        else
          return b.status.localeCompare(a.status)
      })
    }
  }
  const totalUsers = filteredUsers.length

  // total pages
  const totalPages = Math.ceil(totalUsers / itemsPerPage)
  
  return [200, { users: paginateArray(filteredUsers, itemsPerPage, page), totalPages, totalUsers, page: page > Math.ceil(totalUsers / itemsPerPage) ? 1 : page }]
})

// 👉 Add user
mock.onPost('/apps/users/user').reply(config => {
  const { user } = JSON.parse(config.data)

  user.id = genId(users)
  users.push(user)
  
  return [201, { user }]
})

// 👉 Get Single user
mock.onGet(/\/apps\/users\/\d+/).reply(config => {
  // Get event id from URL
  const userId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(userId)
  const userIndex = users.findIndex(e => e.id === Id)
  const user = users[userIndex]

  Object.assign(user, {
    taskDone: 1230,
    projectDone: 568,
    taxId: 'Tax-8894',
    language: 'English',
  })
  if (user)
    return [200, user]
  
  return [404]
})
mock.onDelete(/\/apps\/users\/\d+/).reply(config => {
  // Get user id from URL
  const userId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(userId)
  const userIndex = users.findIndex(e => e.id === Id)
  if (userIndex >= 0) {
    users.splice(userIndex, 1)
    
    return [200]
  }
  
  return [400]
})
