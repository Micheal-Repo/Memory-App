import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath:"apiSlice",
  baseQuery : fetchBaseQuery({
    baseUrl:"http://localhost:3400"
  }),
  typeTags:["Memory"],
  endpoints:(builder)=>({
    
    //Boxes
    fetchBoxes : builder.query({
      query:()=> "/Boxes",
      providesTags:["Memory"]
    }),
    addBox : builder.mutation({
      query:(Box)=>({
        url:"/Boxes",
        method:"POST",
        body:Box
      }),
      invalidatesTags: ['Memory']
    }),
    editBoxName:builder.mutation({
      query:(Box)=>({
        url:`/Boxes/${Box.id}`,
        method:"PATCH",
        body:Box
      }),
      invalidatesTags: ['Memory']
    }),
    deleteBox:builder.mutation({
      query:({id})=>({
        url:`/Boxes/${id}`,
        method:"DELETE",
        body:id
      }),
      invalidatesTags: ['Memory']
    }),
    
    
    
    //SubBoxes
    fetchSubBoxes : builder.query({
      query:()=> "/SubBoxes",
      providesTags:["Memory"]
    }),
    addSubBox : builder.mutation({
      query:(subBox)=>({
        url:"/SubBoxes",
        method:"POST",
        body:subBox
      }),
      invalidatesTags: ['Memory']
    }),
   editSubBox:builder.mutation({
      query:(subBox)=>({
        url:`/SubBoxes/${subBox.id}`,
        method:"PATCH",
        body:subBox
      }),
      invalidatesTags: ['Memory']
    }),
    deleteSubBox:builder.mutation({
      query:({id})=>({
        url:`/subBoxes/${id}`,
        method:"DELETE",
        body:id
      }),
      invalidatesTags: ['Memory']
    }),
    
    
    
    // Cards
    fetchCards : builder.query({
      query:()=> "/Cards",
      providesTags:["Memory"]
    }),
    addCard : builder.mutation({
      query:(card)=>({
        url:"/Cards",
        method:"POST",
        body:card
      }),
      invalidatesTags: ['Memory']
    }),
    editCard:builder.mutation({
      query:(card)=>({
        url:`/Cards/${card.id}`,
        method:"PATCH",
        body:card
      }),
      invalidatesTags: ['Memory']
    }),
    favorite:builder.mutation({
      query:(card)=>({
        url:`/Cards/${card.id}`,
        method:"PATCH",
        body:card
      }),
      invalidatesTags: ['Memory']
    }),
    deleteCard:builder.mutation({
      query:({id})=>({
        url:`/Cards/${id}`,
        method:"DELETE",
        body:id
      }),
      invalidatesTags: ['Memory']
    }),
    
    
    //extra
     deleteAllCard:builder.mutation({
      query:({subBoxId})=>({
        url:`/Cards`,
        method:"DELETE",
        body:subBoxId
      }),
      invalidatesTags: ['Memory']
    }),
    
    
    
    
    
    
    
    
    
    
    
  })
})


export const {
  //Boxes
  useFetchBoxesQuery,
  useAddBoxMutation,
  useEditBoxNameMutation,
  useDeleteBoxMutation,
  
  //SubBoxes
  useFetchSubBoxesQuery,
  useAddSubBoxMutation,
  useEditSubBoxMutation,
  useDeleteSubBoxMutation,
  
  //Cards
  useFetchCardsQuery,
  useAddCardMutation,
  useEditCardMutation,
  useDeleteCardMutation,
  useFavoriteMutation,
  
  //extra
  useDeleteAllCardMutation,
  
  
}= apiSlice