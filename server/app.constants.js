const roles = [
  {
    role: 'read-only',
    permissions: {
      canEdit: false,
      canRead: true
    }
  },
  {
    role: 'write-only',
    permissions: {
      canEdit: true,
      canRead: false
    }
  },
  {
    role: 'admin',
    permissions: {
      canEdit: true,
      canRead: true
    }
  },
]

const secret = 'superdupersecret';

const vessels = [
  {
    name: 'Amazon',
    size: 10000
  },
  {
    name: 'Chiwan',
    size: 14000
  },
  {
    name: 'Bilbao',
    size: 25000
  }
]

module.exports = {
  roles,
  secret,
  vessels
}