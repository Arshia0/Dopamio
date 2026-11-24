from django.core.cache import cache

# This function increase value by one
def incrKey(key, value, timeout=None):
    return cache.incr(key, delta=value)


# This function set value
def setKey(key, value, timeout=None):
    return cache.set(key, value, timeout=timeout)


# This function set value if key exist then give error
def addKey(key, value, timeout=None):
    return cache.add(key, value, timeout=timeout)


# this function get value by key and None if not exist
def getValue(key):
    return cache.get(key)


# this function delete value by key
def deleteKey(key):
    return cache.delete(key)


# this function delete value by pattern
def getAllKey(pattern):
    return cache.keys(pattern)

def getAllValues():
    return list(cache.get_many(getAllKey('*')).values())
