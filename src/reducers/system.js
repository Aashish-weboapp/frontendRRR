import baseState from '../store/baseState';
import {
     GET__LOOKUP,
     GET__MENU, GET__MENU__LISTS,
     GET__LISTS , GET__COLUMNS,
     GET__FORMS, GET__FIELDS, 
     GET__COUNTRIES , GET__COUNTRY__DATA , POST__COUNTRY__DATA
} from '../actions/action';

export default (state = baseState.sysData, { payload, type, error }) => {
  switch (type) {

    case GET__LOOKUP.REQUEST:
      return {
        ...state,
      };

    case GET__LOOKUP.SUCCESS:
      return {
        ...state,
        lookupData: payload.data
      };

    case GET__LOOKUP.FAILURE:
        return {
          ...state,
          lookupData: payload
        };

    case GET__MENU.REQUEST:
      return {
        ...state,
      };

    case GET__MENU.SUCCESS:
      return {
        ...state,
        menu_items: payload.data
      };

    case GET__MENU.FAILURE:
        return {
          ...state,
          menu_items: payload
        };

    case GET__MENU__LISTS.REQUEST:
      return {
        ...state,
      };

    case GET__MENU__LISTS.SUCCESS:
      return {
        ...state,
        list_items: payload.data
      };

    case GET__MENU__LISTS.FAILURE:
        return {
          ...state,
          list_items: payload
        };

    case GET__COLUMNS.REQUEST:
      return {
        ...state,
      };

    case GET__COLUMNS.SUCCESS:
      return {
        ...state,
        column_items: payload.data
      };

    case GET__COLUMNS.FAILURE:
        return {
          ...state,
          column_items: payload
        };

    case GET__FORMS.REQUEST:
      return {
        ...state,
      };

    case GET__FORMS.SUCCESS:
      return {
        ...state,
        form_items: payload.data
      };

    case GET__FORMS.FAILURE:
        return {
          ...state,
          form_items: payload.data
        };

    case GET__FIELDS.REQUEST:
        return {
            ...state,
        };
          
    case GET__FIELDS.SUCCESS:
        return {
            ...state,
            field_items: payload.data
        };
          
    case GET__FIELDS.FAILURE:
        return {
                ...state,
            field_items: payload.data
    };

    case GET__COUNTRIES.REQUEST:
        return {
            ...state,
        };
          
    case GET__COUNTRIES.SUCCESS:
        return {
            ...state,
            countries: payload.data
        };
          
    case GET__COUNTRIES.FAILURE:
        return {
                ...state,
            countries: payload.data
    };

    case GET__COUNTRY__DATA.REQUEST:
        return {
            ...state,
        };
      
    case GET__COUNTRY__DATA.SUCCESS:
         return {
            ...state,
            countryData: payload.data
        };

    case GET__COUNTRY__DATA.FAILURE:
        return {
            ...state,
            countryData: payload.data
        };

    case POST__COUNTRY__DATA.REQUEST:
        return {
            ...state,
        };
      
    case POST__COUNTRY__DATA.SUCCESS:
         return {
            ...state,
            countryData: payload.data
        };

    case POST__COUNTRY__DATA.FAILURE:
        return {
            ...state,
            countryData: payload.data
        }; 
        
    case GET__LISTS.REQUEST:
      return {
        ...state,
      };

    case GET__LISTS.SUCCESS:
      return {
        ...state,
        lists: payload.data
      };

    case GET__LISTS.FAILURE:
        return {
          ...state,
          lists: payload
        };

    default:
      return state;
  }
};