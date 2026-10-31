export type ClientReview={
 id:string;
 category:string;
 quote:string|null;
 name:string|null;
 role:string|null;
 company:string|null;
 approved:boolean;
};

// Layout slots only. Replace with approved quotes and attribution before publishing.
export const clientReviews:ClientReview[]=[
 {id:'platform',category:'Development & migration',quote:null,name:null,role:null,company:null,approved:false},
 {id:'experience',category:'Brand & buying experience',quote:null,name:null,role:null,company:null,approved:false},
 {id:'operations',category:'Systems & ongoing growth',quote:null,name:null,role:null,company:null,approved:false},
];
export function isApprovedReview(review:ClientReview){
 return review.approved&&Boolean(review.quote?.trim()&&review.name?.trim()&&review.company?.trim());
}
