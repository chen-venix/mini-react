export const createElement = (type) => {
  return document.createElement(type);
};

export const setInitialProperties = (domElement, tag, props) => {
  for (const propKey in props) {
    const nextProp = props[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "string" || typeof nextProp === "number") {
        domElement.textContent = nextProp;
      }
    } else if (propKey === "style") {
      for (let stylePropKey in nextProp) {
        domElement.style[stylePropKey] = nextProp[stylePropKey];
      }
    } else {
      domElement[propKey] = nextProp;
    }
  }
};

export const diffProperties = (domElement, type, oldProps, newProps) => {
  let updatePayload = null; // 存放需要更新的键值，比如[key1, key1对应的value1，key2, key2对应的value2]
  let propKey;
  for (propKey in oldProps) {
    if (oldProps.hasOwnProperty(propKey) && newProps.hasOwnProperty(propKey)) {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in newProps) {
    const nextProp = newProps[propKey];
    if (propKey === "children") {
      if (typeof nextProp === "string" || typeof nextProp === "number") {
        if (nextProp !== oldProps[propKey]) {
          (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
      }
    } else {
      if (nextProp !== oldProps[propKey]) {
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
  }
};
