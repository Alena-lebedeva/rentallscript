import { openAdminUserModal } from "../actions/siteadmin/modalActions";

const privileges = [
    {
        id: 1,
        privilege: 'Manage Site Settings',
        permittedUrls: [
            '/siteadmin/settings/site'
        ]
    },
    {
        id: 2,
        privilege: 'Manage Users',
        permittedUrls: [
            '/siteadmin/users',
            '/siteadmin/profileView/'
        ]
    },
    {
        id: 3,
        privilege: 'Manage Listings',
        permittedUrls: [
            '/siteadmin/listings',
            '/become-a-host/'
        ]
    },
    {
        id: 4,
        privilege: 'Manage Reservations',
        permittedUrls: [
            '/siteadmin/reservations',
            '/siteadmin/viewreservation/'
        ]
    },
    {
        id: 5,
        privilege: 'Manage User Reviews',
        permittedUrls: [
            '/siteadmin/user-reviews'
        ]
    },
    {
        id: 6,
        privilege: 'Manage Admin Reviews',
        permittedUrls: [
            '/siteadmin/reviews',
            '/siteadmin/write-reviews'
        ]
    },
    {
        id: 7,
        privilege: 'Manage Site Service Fee',
        permittedUrls: [
            '/siteadmin/settings/servicefees'
        ]
    },
    {
        id: 8,
        privilege: 'Manage User Document Verification',
        permittedUrls: [
            '/siteadmin/document'
        ]
    },
    {
        id: 9,
        privilege: 'View User Messages',
        permittedUrls: [
            '/siteadmin/messages',
            '/message/'
        ]
    },
    {
        id: 10,
        privilege: 'Manage User Reports',
        permittedUrls: [
            '/siteadmin/reportUser',
        ]
    },
    {
        id: 11,
        privilege: 'Manage Search Settings',
        permittedUrls: [
            '/siteadmin/settings/search'
        ]
    },
    {
        id: 12,
        privilege: 'Manage Home Page Banners',
        permittedUrls: [
            '/siteadmin/home/caption',
            '/siteadmin/home/banner',
            '/siteadmin/home/footer-block',
            '/siteadmin/home/static-info-block',
            '/siteadmin/home/home-banner'
        ]
    },
    {
        id: 13,
        privilege: 'Manage Popular Locations',
        permittedUrls: [
            '/siteadmin/popularlocation',
            '/siteadmin/popularlocation/add',
            '/siteadmin/edit/popularlocation/'                      
        ]
    },
    {
        id: 14,
        privilege: 'Manage Listing Settings',
        permittedUrls: [
            '/siteadmin/listsettings/1',
            '/siteadmin/listsettings/2',
            '/siteadmin/listsettings/3',
            '/siteadmin/listsettings/4',
            '/siteadmin/listsettings/5',
            '/siteadmin/listsettings/6',
            '/siteadmin/listsettings/7',
            '/siteadmin/listsettings/8',
            '/siteadmin/listsettings/9',
            '/siteadmin/listsettings/10',
            '/siteadmin/listsettings/11',
            '/siteadmin/listsettings/12',
            '/siteadmin/listsettings/13',
            '/siteadmin/listsettings/14',
            '/siteadmin/listsettings/15',
            '/siteadmin/listsettings/16',
            '/siteadmin/listsettings/18',
            '/siteadmin/listsettings/19'
        ]
    },
    {
        id: 15,
        privilege: 'Manage CMS Pages',
        permittedUrls: [
            '/siteadmin/content-management',
            '/siteadmin/page/add',
            '/siteadmin/staticpage/management',
            '/siteadmin/edit/staticpage/'
        ]
    },
    {
        id: 16,
        privilege: 'Manage Why Become Owner Page',
        permittedUrls: [
            '/siteadmin/whyHost/Block1',
            '/siteadmin/whyHost/Block2',
            '/siteadmin/whyHost/Block3',
            '/siteadmin/whyHost/Block4',
            '/siteadmin/whyHost/Block5',
            '/siteadmin/whyHost/Block6',
            '/siteadmin/whyHost/Block7'
        ]
    },

];

export function getAllAdminPrivileges() {
    return privileges;
}

export function getAllAdminPrivilegesId() {
    return privileges.map((item) => item.id);
}

export function validatePrivilege(requestId, permittedPrevileges) {
    return permittedPrevileges && permittedPrevileges.length > 0 && permittedPrevileges.indexOf(requestId) >= 0;
}

export function restrictUrls(requestURL, permittedPrevileges) {
    let findRequestedUrlId = privileges.find((o) => o && o.permittedUrls 
        && o.permittedUrls.length > 0 && o.permittedUrls.indexOf(requestURL) >= 0);
    
    if (findRequestedUrlId) {
        let checkAccess = permittedPrevileges && permittedPrevileges.length 
            && permittedPrevileges.indexOf(findRequestedUrlId.id) >= 0;
        if (checkAccess) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }  
}
